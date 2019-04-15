export default function (data, code, msg) {
   let _ = this;
   _.code = code || 0;
   _.msg = msg || '请求成功';
   _.data = data;
}