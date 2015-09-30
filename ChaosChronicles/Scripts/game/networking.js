var Networking = {};

$(function () {
    // Proxy created on the fly          
    Networking.chat = $.connection.chatHub;
    // Get the user name and store it to prepend to messages.
    //$('#displayname').val(prompt('Enter your name:', ''));

    // Declare a function on the chat hub so the server can invoke it          
    Networking.chat.client.sendMessage = function (name, message) {
        var encodedName = $('<div />').text(name).html();
        var encodedMsg = $('<div />').text(message).html();
        $('#messages').append('<li>' + encodedName + ':&nbsp;&nbsp;' + encodedMsg + '</li>');
        Notifications.PageTitleNotification.On("New Message", 3000);
    };

    // Start the connection
    $.connection.hub.start().done(function () {
        $("#send").click(function () {
            // Call the chat method on the server
            Networking.chat.server.sendMessage(InstanceData.currentPlayer, $('#msg').val());
        });
    });

    Networking.interaction = $.connection.interactionHub;
    Networking.interaction.client.sendUnitMove = function (unitIndex, toSectorIndex, gridCellX, gridCellY) {
        //$('#messages').append('<li>' + doomtrooperIndex + ",TS:" + toSectorIndex + ",(" + gridCellX + "," + gridCellY + ")" + '</li>');
        console.log("Unit Index: " + unitIndex + ", To Sector Index: " + toSectorIndex + ", Moving To: (" + gridCellX + "," + gridCellY + ")");
        Interaction.PerformMove(unitIndex, toSectorIndex, gridCellX, gridCellY);
    };

    Networking.players = $.connection.playersHub;
    Networking.players.client.sendPlayerCorporation = function (playerIndex, corporationIndex, nextPlayerIndex) {
        //$('#messages').append('<li>' + doomtrooperIndex + ",TS:" + toSectorIndex + ",(" + gridCellX + "," + gridCellY + ")" + '</li>');
        console.log("Player Index: " + playerIndex + ", Corporation Index: " + corporationIndex);
        Corporations.PerformChooseCorporation(playerIndex, corporationIndex, nextPlayerIndex);
    };
});

//Networking.SendDoomtrooperMove = function (doomtrooperIndex, toSectorIndex, gridCellX, gridCellY) {
//    Networking.interaction.server.sendDoomtrooperMove(doomtrooperIndex, toSectorIndex, gridCellX, gridCellY);
//}
Networking.SendUnitMove = function (unitIndex, toSectorIndex, gridCellX, gridCellY) {
    Networking.interaction.server.sendUnitMove(unitIndex, toSectorIndex, gridCellX, gridCellY);
}
Networking.SendPlayerCorporation = function (playerIndex, corporationIndex, nextPlayerIndex) {
    Networking.players.server.sendPlayerCorporation(playerIndex, corporationIndex, nextPlayerIndex);
}