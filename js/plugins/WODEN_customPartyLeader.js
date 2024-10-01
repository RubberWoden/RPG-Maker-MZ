///////////////////////////////////////////////////////////
//  Woden's Custom Leader Plugin
///////////////////////////////////////////////////////////
/*:
 * @target MZ
 * @author Woden Burison
 * @description A plugin to set the party leader to 
 * someone other than a battler, like in Pokemon games.
 * 
 * @param customLeader
 * @text Custom Leader:
 * @desc Pick a custom leader.
 * @type actor
 * @default Reid
 * 
 * @help
 * Setting a custom party leader so your leader isn't a battler.
 * 
 * Credits
 * Special thanks to the ATT_Turan and the other reviewers
 * on forums.rpgmakerweb.com
 */
const WODEN_customLeader = {};
WODEN_customLeader.pluginName = "WODEN_customPartyLeader";

//getting params
WODEN_customLeader.parameters = PluginManager.parameters(
    WODEN_customLeader.pluginName
);

WODEN_customLeader.customLeader = String(WODEN_customLeader.parameters["customLeader"] || "Reid");

//override party leader function from rmmz_objects 5454
Game_Party.prototype.leader = function() {
    let leader = WODEN_customLeader.customLeader;
    return $gameActors.actor(leader);
};

