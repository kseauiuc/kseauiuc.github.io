var GoogleAuth; // Google Auth object.
function initClient() {
gapi.client.init({
    'apiKey': 'AIzaSyDap2KiZIsgZ_L519Ssx-DyEWAtl1IjN4U',
    //'clientId': 'YOUR_CLIENT_ID',
    'scope': 'https://www.googleapis.com/auth/youtube.force-ssl',
    'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest']
}).then(function () {
    GoogleAuth = gapi.auth2.getAuthInstance();

    // Listen for sign-in state changes.
    GoogleAuth.isSignedIn.listen(updateSigninStatus);
});
}
var vid;
$.ajax('https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=PLXZVLgX7K_jQib3JmQhRguXM6X5EsHzdU&key=AIzaSyDap2KiZIsgZ_L519Ssx-DyEWAtl1IjN4U').done(function(res){
    var videos = res.items;
    videos.forEach(function(video,idx){
        var tag = "<div class='video col-md-3 pointer' onclick='setNewVideo("+'"'+video.snippet.resourceId.videoId+'"'+")'><img src='"+video.snippet.thumbnails.standard.url+"'><div class='video-title'>"+video.snippet.title+"</div></div>"
        $("#youtube .video-list").append(tag);
        if(idx == 0){
            console.log(video);
            vid = video.snippet.resourceId.videoId;
            
            //$('#player iframe').attr('src','http://www.youtube.com/embed/'+video.id);
            // 2. This code loads the IFrame Player API code asynchronously.
            var tag = document.createElement('script');
        
            tag.src = "http://www.youtube.com/iframe_api";
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        }
    });
});

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: vid,
        events: {
        'onReady': onPlayerReady
        }
    });
    }


function onPlayerReady(event){
    event.target.playVideo();    
}

function setNewVideo(videoId){
    player.loadVideoById(videoId,0,"large");
    //$('#player iframe').attr('src','http://www.youtube.com/embed/'+video.id);
}