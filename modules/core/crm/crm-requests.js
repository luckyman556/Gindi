import {setCookie} from "../cookies/setAndGetCookies.js";

export const crmRequests = {
    getToken () {
        var request = new XMLHttpRequest();
        var data = {
            client_id: client_id,
            client_secret: client_secret,
            grant_type: grant_type,
            scope: scope,
        };
        var params = typeof data == 'string' ? data : Object.keys(data).map(
            function(k){ return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) }
        ).join('&');
        request.open('POST', 'https://identity.bmby.com/connect/token', true);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        request.send(params);
        request.onload = function() {
            let parsedResponce = JSON.parse(request.response);
            window['token_response'] = parsedResponce['access_token'];
            setCookie(projectName + '_access_token', parsedResponce['access_token'], {'max-age': 3600});
        };
    },
    tokenCheck (callback) {
        if (window['token_response']) {
            callback();
        } else {
            setTimeout(function(){
                crmRequests.tokenCheck(callback);
            }, 100);
        }
    },
    getBuildingProps (building_index) {
        var request = new XMLHttpRequest();
        let building_number = buildings_info[building_index].build_id;
        request.open('GET',  crm_server + 'api/dreamsv2/props?houseId=' + building_number, true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.setRequestHeader('Authorization', 'Bearer ' +  window['token_response']);
        request.send();
        request.onload = function() { 
            let crm_data = JSON.parse(request.response);
            buildings_info[building_index].crm_data = crm_data;
        };
    }
}