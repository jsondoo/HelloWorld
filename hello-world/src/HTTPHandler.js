

    export default function getRequest(url) {

        var cb = function(){
            if(req.readyState === XMLHttpRequest.DONE && req.status === 200) {
                return (req.responseText);
            }else return "FALSE";
        }

        var req = new XMLHttpRequest();
        req.open("GET", url, true);
        req.onreadystatechange = cb;
        req.send();


    }