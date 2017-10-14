var GoogleAuth; // Google Auth object.
function initClient() {
gapi.client.init({
    'apiKey': 'YOUR_API_KEY',
    'clientId': 'YOUR_CLIENT_ID',
    'scope': 'https://www.googleapis.com/auth/youtube.force-ssl',
    'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest']
}).then(function () {
    GoogleAuth = gapi.auth2.getAuthInstance();

    // Listen for sign-in state changes.
    GoogleAuth.isSignedIn.listen(updateSigninStatus);
});
}
document.ready(function(){
    $.ajax('https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=PLXZVLgX7K_jQib3JmQhRguXM6X5EsHzdU&key=AIzaSyDap2KiZIsgZ_L519Ssx-DyEWAtl1IjN4U').done(function(res){
        console.log(res);
    });
});