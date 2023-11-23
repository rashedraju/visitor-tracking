(async function () {
    function getCookie(cookieName) {
        const cookies = document.cookie.split("; ");

        for (const cookie of cookies) {
            const [name, value] = cookie.split("=");

            if (name === cookieName) {
                return cookie;
            }
        }

        return null;
    }

    function addOrUpdateCookie(cookieName, cookieValue) {
        const existingCookie = getCookie(cookieName);

        const newCookie = `${cookieName}=${cookieValue}; path=/`;

        if (existingCookie) {
            document.cookie = document.cookie.replace(
                existingCookie,
                newCookie
            );
        } else {
            document.cookie = newCookie;
        }
    }

    function generateVisitId() {
        return Date.now().toString(36);
    }

    async function getIpAddress() {
        const res = await fetch("https://api64.ipify.org?format=json");
        const data = await res.json();
        return data.ip;
    }

    function objectToQueryString(obj) {
        const queryParams = [];

        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const value = obj[key];
                queryParams.push(
                    `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
                );
            }
        }

        return queryParams.join("&");
    }

    function generateSessionId() {
        let result = "";
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const charactersLength = characters.length;

        for (let i = 0; i < 10; i++) {
            const randomIndex = Math.floor(Math.random() * charactersLength);
            result += characters.charAt(randomIndex);
        }

        return result;
    }

    function getPagePath() {
        return window.location.pathname;
    }

    async function makeVisitor(_visitId) {
        try {
            var queryData = {
                _visit_id: _visitId,
            };

            await fetch(
                "http://localhost:8000/api/analytics/visitor?" +
                    objectToQueryString(queryData)
            );
        } catch (error) {}
    }

    async function makeVisit(_visitId) {
        try {
            var visitTime = Date.now();
            var sessionId = generateSessionId();

            addOrUpdateCookie(
                "_visit_" + sessionId,
                "_visit." + sessionId + "." + visitTime
            );

            var ip = await getIpAddress();
            var userAgent = navigator.userAgent;
            var pagePath = getPagePath();

            var queryData = {
                _visit_id: _visitId,
                session_id: sessionId,
                ip_address: ip,
                user_agent: userAgent,
                page_path: pagePath,
            };

            await fetch(
                "http://localhost:8000/api/analytics/visit?" +
                    objectToQueryString(queryData)
            );
        } catch (error) {}
    }

    var visitId = getCookie("_visit_id")?.split("=")[1];

    if (!visitId) {
        // add new visit id
        visitId = generateVisitId();

        addOrUpdateCookie("_visit_id", visitId);

        // make request to create new visitor
        makeVisitor(visitId);
    }

    makeVisit(visitId);
})();
