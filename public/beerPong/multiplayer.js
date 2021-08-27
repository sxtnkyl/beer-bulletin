var avatars = {};
var BPchannel;
var myId;

// import baseApiUrl =============================================================================
// import channel name =============================================================================

var ably = new Ably.Realtime({
  // add baseApiUrl  =============================================================================
  authUrl: "/auth",
  echoMessages: false,
});
ably.connection.once("connected", function () {
  myId = ably.auth.tokenDetails.clientId;
  startApp(myId);
});

function startApp(userId) {
  // var x = Math.random() * (20 - (-20)) + (-20);
  // var y = 0;
  // var z = 0;
  // var initialPosition = { x: x, y: y, z: z };

  // add channel name =============================================================================
  BPchannel = ably.channels.get("BP-channel");
  BPchannel.presence.enter();
  var currentUser = {
    type: "a-box",
    attr: {
      position: initialPosition,
      rotation: "0 0 0",
      color: "#373737",
      depth: "1",
      height: "1",
      width: "1",
    },
  };
  //publish initial data
  BPchannel.publish("attr-change", currentUser);
  // var camera = document.getElementById('user-cam');

  // USE THIS FOR PHYSICS UPDATES =============================================================================
  function networkTick() {
    var latestPosition = camera.getAttribute("position");
    var latestRotation = camera.getAttribute("rotation");
    currentUser.attr = {
      position: latestPosition,
      rotation: latestRotation,
      color: "#373737",
    };
    //publish updating data
    BPchannel.publish("attr-change", currentUser);
  }
  setInterval(networkTick, 100);
  //get a list of already existing avatars
  BPchannel.presence.get(function (err, members) {
    for (var i in members) {
      console.log("Found existing avatar");
      console.log(members[i].clientId);
      subscribeToAvatarChanges(members[i].clientId);
    }
  });
  //subscribe to new user entries
  BPchannel.presence.subscribe("enter", function (member) {
    var memberData = JSON.stringify(member);
    var memberJSON = JSON.parse(memberData);
    subscribeToAvatarChanges(memberJSON.clientId);
  });
  //subscribe to existing users leaving
  BPchannel.presence.subscribe("leave", function (member) {
    removeAvatar(JSON.stringify(member.clientId));
  });
}

// REPLACE WITH FUNCTION TO DO SOMETHING WHEN OTHER USER LEAVES =====================================
//remove avatar when a user leaves
function removeAvatar(id) {
  var idToRemove = eval(id).toString();
  var scene = document.getElementById("scene");
  scene.removeChild(avatars[idToRemove]);
}

// POSSIBLY ADD IN USER NAME AND/OR PHOTO TO GAME SPACE ===========================================================
//add Avatar when user enters
function createAvatar(id, avatarJSON) {
  var attr = JSON.stringify(avatarJSON.data.attr);
  var new_attr = JSON.parse(attr);
  var type = JSON.stringify(avatarJSON.data.type);
  var newBox = document.createElement(eval(type));
  for (var key in new_attr) {
    newBox.setAttribute(key, new_attr[key]);
  }
}

//subscribe to changes in attributes
function subscribeToAvatarChanges(id) {
  VRchannel.subscribe("attr-change", function (data) {
    var avatarData = JSON.stringify(data);
    var avatarJSON = JSON.parse(avatarData);
    if (avatarExists(avatarJSON.clientId)) {
      updateAvatar(avatarJSON.clientId, avatarJSON);
    } else {
      if (avatarJSON.clientId != myId)
        createAvatar(avatarJSON.clientId, avatarJSON);
    }
  });
}
//check if avatar needs to be created or updated
function avatarExists(id) {
  return avatars.hasOwnProperty(id);
}
//update Avatar according to changing attributes
function updateAvatar(id, avatarJSON) {
  var avatar = avatars[id];
  var position = JSON.stringify(avatarJSON.data.attr.position);
  var rotation = JSON.stringify(avatarJSON.data.attr.rotation);
  avatar.setAttribute("position", JSON.parse(position));
  avatar.setAttribute("rotation", JSON.parse(rotation));
}
