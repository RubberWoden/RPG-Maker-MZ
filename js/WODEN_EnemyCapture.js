///////////////////////////////////////////////////////////
//      Woden's Enemy Capture Plugin
///////////////////////////////////////////////////////////
/**
 * @target MZ
 * @author Woden Burison
 * @plugindesc A plugin to have something similar to monster tamer games.
 * 
 * 
 * @help
 * 
 * ============ Enemy Notetags  ==========
 * <captureRate: 0>
 * <stage: 0>
 * <evolutionLine: name>
 * <actorID: 0>
 * 
 * ============ Item Notetags   ==========
 * <captureRate: 0>
 * 
 * ============ Actor Notetags  ==========
 * <captureRate: 0>
 * <stage: 0>
 * <evolutionLine: name>
 * <evolveLvl: 0>
 * <canEvolve: false>
 * 
 * 
 * ============ Status Notetags ==========
 * <captureRate: 0>
 * 
 * 
 */

const WODEN_enemycapture = {};
WODEN_enemycapture.pluginName = "WODEN_EnemyCapture";

///////////////////////////////////////////////////////////
//  Party Check Function
///////////////////////////////////////////////////////////

function wodenCheckAIP(actorID) {
    //Returns true if Actor is in Party
    console.log("CIP");
    let checkCIP = $gameParty._actors.includes(actorID);
    console.log("CIP? " + checkCIP);
    return checkCIP;
};

///////////////////////////////////////////////////////////
//  Add Actor Function
///////////////////////////////////////////////////////////

//REDO

///////////////////////////////////////////////////////////
//  Compare Stages Function
///////////////////////////////////////////////////////////

function wodenCompareStages(actorID, enIndex) {
    console.log("compareStages");
    
    //get actor stage
    let actStage = Number($gameActors.actor(actorID).meta.stage);
    
    //get enemy stage
    let enStage = Number($gameTroop.members()[enIndex].enemy().meta.stage);
    
    //compare stages
    let comStages = actStage - enStage;
    switch (comStages) {
        case 2:
        case 1:
            return true;
            break;
        default:
            return false;
            break;
    };
};

///////////////////////////////////////////////////////////
//  Evolve Monster Function
///////////////////////////////////////////////////////////

//REDO

///////////////////////////////////////////////////////////
//  Level Up Function Override Check to Evo
///////////////////////////////////////////////////////////

Game_Actor.prototype.levelUp = function() {
    this._level++;
    for (const learning of this.currentClass().learnings) {
        if (learning.level === this._level) {
            this.learnSkill(learning.skillId);
        }
    }
    console.log("levelCheck");
//REDO
    //check for canEvolve: True/False
        //if true check for evolve level
            //if current level >= evolve level question to evolve
};

///////////////////////////////////////////////////////////
//  XP from Dupes Function
///////////////////////////////////////////////////////////

function gainXP(actorID) {
    console.log("gainXP");
    let xpGain = Math.floor((actor.nextLevelExp() - actor.currentLevelExp()) * 0.1 + 1);
    actor.gainExp(xpGain);
    actor.refresh();
    $gameVariables.setValue(1, actor._name);
    $gameVariables.setValue(2, xpGain);
    $gameMessage.add("\\v[1] has gained \\v[2] XP!");
};

///////////////////////////////////////////////////////////
//  Capture Functions
///////////////////////////////////////////////////////////

//d100 roll
function dieRoll() {
    console.log("dieRoll");
    return Math.floor(Math.random()*101);
};

//Item Capture Rate
function cardCaptureRate() {
    return (Number($gameParty.lastItem().meta.captureRate)/3);
};

//Enemy Capture Rate
function monCaptureRate(enemyID) {
    console.log("monCaptureRate");
    return (Number($dataEnemies[enemyID].meta.captureRate)/3);
};

//Status Capture Rate
function statusCaptureRate(enemyIndex) {
    console.log("statusCaptureRate");
    let enemy = $gameTroop.members();
    var runTotal = 0;
    
    //Sleep
    if (enemy[enemyIndex].isStateAffected(10)){
        let sleepCR = Number($dataStates[10].meta.captureRate);
        var runTotal = runTotal + sleepCR;
    }
    /* Copy Paste for each status change x and y
    //x
    if (enemy[enemyIndex].isStateAffected(y)){
        let xCR = Number($dataStates[y].meta.captureRate);
        var runTotal = runTotal + xCR;
    }
    */
    let finalStatusRate = Math.ceil(runTotal * 0.05);
    return finalStatusRate;
};

//HP Capture Rate
function monHPRate(enIndex) {
    let remainHP = (($gameTroop.members()[enIndex].hp / $gameTroop.members()[enIndex].mhp) * 100)
    let hpRate = Math.floor(100 - remainHP);
    return (hpRate/3);
};

//Capture Attempt
function qCaught(enemyID, enIndex) {
    console.log("qCaught");
    let rollResult = dieRoll();
    let cardCR = cardCaptureRate();
    let monCR = monCaptureRate(enemyID);
    let statusCR = statusCaptureRate(enIndex);
    let hpCR = monHPRate(enIndex);
    let crMonCardHP = Math.ceil((cardCR + monCR + hpCR)*0.85);
    let totalCR = crMonCardHP + statusCR;
    if (totalCR >= rollResult){
        return true;
    } else {
        return false;
    };
};

///////////////////////////////////////////////////////////
//  Question to Evolve Function
///////////////////////////////////////////////////////////

function qToEvo(actorID) {
    $gameMessage.add(`Would you like ${$gameActors.actor(actorID)._name} to evolve?`);
    $gameMessage.setChoices(['Yes','No'], 1, -1);
    $gameMessage.setChoiceBackground(1);
    $gameMessage.setChoicePositionType(2);
    $gameMessage.setChoiceCallback(n => {
        $gameVariables.setValue(1, n);
        let gameChoice = $gameVariables.value(1);
        if (gameChoice === 0){
        wodenEvolveMon(actorID)
        console.log("Said yes to Evolve!");
        }
    });
};

///////////////////////////////////////////////////////////
//  Main Catch Function
///////////////////////////////////////////////////////////

function wodenMain(params) {
//REDO
    //vars

    //cacthing function

    //Question catch

        //if catch success
        //check if monster line is in party

            //if in party, compare stages

                //if higher stage question to evolve

                //if not higher stage gain xp

            //if not in party, put in party

        //if catch is not success
        //play message

}





