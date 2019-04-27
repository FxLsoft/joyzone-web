node build/build.js

# 上传文件
scp -r dist/* root@47.106.39.130:/usr/share/nginx/html

# 更改文件权限
ssh root@47.106.39.130 "cd /usr/share/nginx/html;chmod 777 *; chmod 777 static/*; cd static; chmod 777 css/*; chmod 777 fonts/*; chmod 777 img/*; chmod 777 js/*"