#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import json
import os
import sys
from flask import Flask, render_template_string, request, jsonify
import webbrowser

app = Flask(__name__)
CONFIG_DIR = 'configs'
FILES = ['experiences.json', 'papers.json']

@app.route('/')
def index():
    return render_template_string('''
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Experiences and Publications Editor</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .quit-button {
            position: absolute;
            top: 20px;
            right: 20px;
            padding: 10px 20px;
            background-color: #ff4444;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 18px;
        }
        .quit-button:hover {
            background-color: #cc0000;
        }
        .container {
            display: flex;
            gap: 20px;
        }
        .file-selector {
            margin-bottom: 20px;
        }
        .editor-panel {
            flex: 1;
            background-color: white;
            padding: 10px;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            overflow-x: auto; /* 添加水平滚动条 */
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
            min-height: 200px;
            overflow-y: auto;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 12px;
            text-align: left;
            min-width: 150px;
            /* 增加单元格高度 */
            height: 40px;
        }
        th {
            background-color: #f2f2f2;
            position: sticky; /* 表头固定 */
            top: 0;
            z-index: 1; /* 设置叠层顺序 */
        }
        input, select {
            width: 100%;
            padding: 8px;
            box-sizing: border-box;
        }

        .file-selector button {
            padding: 12px 24px;
            font-size: 18px;
            margin-right: 10px;
        }
    </style>
</head>
<body>
    <h1>Experiences and Publications Editor</h1>
    <button class="quit-button" onclick="quitServer()">quit</button>
    <div class="file-selector">
        {% for file in files %}
        {% if file == 'experiences.json' %}
        <button onclick="loadFile('{{ file }}')">Experiences</button>
        {% elif file == 'papers.json' %}
        <button onclick="loadFile('{{ file }}')">Publications</button>
        {% endif %}
        {% endfor %}
    </div>
    <div class="container">
        <div class="editor-panel" id="editor-panel"></div>
    </div>

    <script>
        let currentFile = '';
        
        // 加载文件
        async function loadFile(filePath) {
            currentFile = filePath;
            try {
                const response = await fetch(`/load?file=${filePath}`);
                const data = await response.json();
                // 移除文件大标题显示
                // displayFileList(filePath);
                renderTable(data);
            } catch (error) {
                console.error('加载文件失败:', error);
            }
        }

        // 页面加载完成后默认加载 Experiences 数据
        window.onload = function() {
            loadFile('experiences.json');
        };

        // 显示文件列表
        function displayFileList(filePath) {
            const fileList = document.getElementById('file-list');
            fileList.innerHTML = `<h3>${filePath}</h3>`;
        }

        // 渲染表格
        function renderTable(data) {
            const editorPanel = document.getElementById('editor-panel');
            const filePath = currentFile.split('/').pop();
            // 保存当前输入框的值
            const inputs = editorPanel.querySelectorAll('input');
            const inputValues = {};
            inputs.forEach(input => {
                inputValues[input.getAttribute('onchange')] = input.value;
            });
            
            let tableHtml = '';
            editorPanel.innerHTML = '';

            // 添加表格标题
            if (filePath === 'experiences.json') {
                tableHtml += '<h2 class="table-title">Experiences</h2>';
            } else if (filePath === 'papers.json') {
                tableHtml += '<h2 class="table-title">Publications</h2>';
            }

            tableHtml += '<table>';

            if (filePath === 'papers.json' && typeof data === 'object' && data !== null) {
                // 定义 papers 表格要显示的字段
                const PAPER_FIELDS = ['title', 'author', 'award', 'image', 'type', 'publication', 'abstract', 'bibtex', 'pdflink', 'codelink', 'videolink'];
                // 处理 papers.json 文件
                const headers = ['year', 'papers'];
                tableHtml += '<tr>';
                headers.forEach(header => {
                    tableHtml += `<th>${header}</th>`;
                });
                tableHtml += '</tr>';

                // 显示 year 数据
                tableHtml += '<tr>';
                tableHtml += `<td><input type="text" value="${data['year'].join(', ')}" onchange="updateData('', 'year', this.value)"></td>`;

                // 处理 papers 数组
                if (Array.isArray(data['paper'])) {
                    tableHtml += '<td><table class="papers-table"><tr>';
                    PAPER_FIELDS.forEach(header => {
                        tableHtml += `<th>${header}</th>`;
                    });
                    tableHtml += '</tr>';

                    data['paper'].forEach((paper, paperIndex) => {
                        tableHtml += '<tr>';
                        PAPER_FIELDS.forEach(header => {
                            tableHtml += `<td><input type="text" value="${paper[header] || ''}" onchange="updateData('paper', ${paperIndex}, '${header}', this.value)"></td>`;
                        });
                        tableHtml += '</tr>';
                    });
                    tableHtml += '</table></td>';
                }
                tableHtml += '</tr>';
            } else if (Array.isArray(data)) {
                // 处理数组类型
                const headers = Object.keys(data[0] || {});
                tableHtml += '<tr>';
                headers.forEach(header => {
                    tableHtml += `<th>${header}</th>`;
                });
                tableHtml += '</tr>';

                data.forEach((item, rowIndex) => {
                    tableHtml += '<tr>';
                    headers.forEach(header => {
                        tableHtml += `<td><input type="text" value="${item[header] || ''}" onchange="updateData(${rowIndex}, '${header}', this.value)"></td>`;
                    });
                    tableHtml += '</tr>';
                });
            } else if (typeof data === 'object' && data !== null) {
                // 处理对象类型
                tableHtml += '<tr><th>键</th><th>值</th></tr>';
                for (const key in data) {
                    if (Array.isArray(data[key])) {
                        // 简单处理数组，可按需扩展
                        tableHtml += `<tr><td>${key}</td><td><input type="text" value="[数组]" disabled></td></tr>`;
                    } else {
                        tableHtml += `<tr><td>${key}</td><td><input type="text" value="${data[key] || ''}" onchange="updateData('', '${key}', this.value)" onclick="enlargeEditor(this)"></td></tr>`;
                    }
                }
            }

            tableHtml += '</table>';
            editorPanel.innerHTML = tableHtml;
            // 恢复输入框的值
            const newInputs = editorPanel.querySelectorAll('input');
            newInputs.forEach(input => {
                const key = input.getAttribute('onchange');
                if (inputValues[key] !== undefined) {
                    input.value = inputValues[key];
                }
            });
        }



        // 退出服务器
        async function quitServer() {
            try {
                await fetch('/quit', { method: 'POST' });
            } catch (error) {
                console.error('退出服务器失败:', error);
            }
            window.open('', '_self').close();
        }

        // 更新数据
        async function updateData(rowIndex, key, value) {
            try {
                const response = await fetch(`/update?file=${currentFile}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        'rowIndex': rowIndex,
                        'key': key,
                        'value': value
                    })
                });
                if (!response.ok) {
                    console.error('更新失败:', await response.text());
                }
            } catch (error) {
                console.error('更新出错:', error);
            }
        }
    </script>
</body>
</html>
    ''', files=FILES)

@app.route('/load')
def load_file():
    file_name = request.args.get('file')
    file_path = os.path.join(CONFIG_DIR, file_name)
    if file_name in FILES and os.path.exists(file_path):
        with open(file_path, 'r', encoding='utf-8') as f:
            return jsonify(json.load(f))
    return jsonify({}), 404

@app.route('/update', methods=['POST'])
def update_file():
    file_name = request.args.get('file')
    file_path = os.path.join(CONFIG_DIR, file_name)
    if file_name not in FILES or not os.path.exists(file_path):
        return jsonify({}), 404

    data = request.get_json()
    with open(file_path, 'r', encoding='utf-8') as f:
        content = json.load(f)

    if isinstance(content, list):
        content[data['rowIndex']][data['key']] = data['value']
    elif isinstance(content, dict):
        content[data['key']] = data['value']

    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(content, f, ensure_ascii=False, indent=2)

    return jsonify(content)

@app.route('/quit', methods=['POST'])
def quit_server():
    os._exit(0)

if __name__ == '__main__':
    url = 'http://127.0.0.1:5000'
    webbrowser.open_new(url)
    app.run(debug=True, use_reloader=False)