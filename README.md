# 青少年壁球赛事网

中英双语气球赛事日历网站

## GitHub Pages 部署说明

### 首次推送代码到 GitHub

```bash
# 1. 进入项目目录
cd squash-competition-site

# 2. 初始化 Git（如果还没初始化）
git init
git remote add origin https://github.com/JackyLyu-coder/JST.git

# 3. 添加所有文件
git add .

# 4. 提交
git commit -m "Initial commit"

# 5. 推送到 GitHub
git branch -M main
git push -u origin main
```

### 后续更新

修改 `src/data/events.ts` 中的赛事数据后：

```bash
git add .
git commit -m "Update events data"
git push
```

GitHub Actions 会自动构建并发布到 GitHub Pages。

### 网站地址

上线后访问：`https://JackyLyu-coder.github.io/JST`

### 启用 GitHub Pages

1. 打开 https://github.com/JackyLyu-coder/JST
2. 点击 **Settings** → **Pages**
3. 在 "Source" 下选择 **GitHub Actions**
4. 保存即可（不需要手动选 branch）

以后每次 push 到 `main` 分支，GitHub 会自动构建并发布 ✅
