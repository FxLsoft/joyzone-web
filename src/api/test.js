    

/**
* 用于开发环境或者测试环境
*/
function isString(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1) == 'String';
}
(function (win) {
    (function () {
        if (win.XMLHttpRequest && win.XMLHttpRequest.prototype) {
            var tType, tUrl, openTime, xhr = XMLHttpRequest.prototype, open = xhr.open, send = xhr.send;
            xhr.open = function (type, url) {
                try {
                    tType = type;
                    tUrl = url;
                    openTime = new Date().getTime();
                    open.apply(this, arguments);
                } catch (error) {
                    open && open.apply(this, arguments);
                }
            };
            xhr.send = function () {
                var _self = this, onreadystatechange = _self.onreadystatechange;
                var request = arguments && arguments[0];
                _self.onreadystatechange = function () {
                    var url = _self.responseURL || tUrl;
                    if (4 === _self.readyState && url.indexOf('sockjs-node') == -1) {
                        var time = new Date().getTime() - openTime;
                        console.log('%c----------------------------------------------------', 'color:blue');
                        console.log("[接口:] " + url + "  " + tType + "  " + new Date(openTime).Format('yyyy-MM-dd HH:mm:ss') + "  " + time + "ms" + "\n[入参:] " + (isString(request) ? decodeURIComponent(request) : JSON.stringify(request)) + "\n[出参:] " + _self.responseText);
                        console.log('');
                    }
                    onreadystatechange && onreadystatechange.apply(_self, arguments);
                }
                send.apply(this, arguments);
            }
        }
    })();
})(window)