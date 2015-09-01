var Mission = {};
Mission.currentMission;

Mission.AddNewMission = function (missionNumber, firstTimeLoad) {
    var mission = new Object();

    //load from database
    $.ajax({
        url: "/Home/GetMissionData",
        type: "POST",
        data: { 'ObjectIdentifier': missionNumber },
        dataType: "json",
        success: function (result) {
            switch (result.Result) {
                case true:
                    //from database
                    mission.imgMissionPath = result.Data.ImgMissionPath;
                    mission.imgMapPath = result.Data.ImgMapPath;
                    //var texture = PIXI.Texture.fromImage(GameConstants.IMAGESROOT + mission.imgPath);
                    //mission = new PIXI.Sprite(texture);

                    //mission.interactive = true;
                    //mission.buttonMode = true;
                    //mission.on('mousedown', Board.Sectors.SelectMission);

                    mission.missionNumber                    = result.Data.MissionNumber;
                    mission.name                             = result.Data.Name;
                    mission.textBriefing                     = result.Data.TextBriefing;
                    mission.textDescription                  = result.Data.TextDescription;
                    mission.textTimeLimit                    = result.Data.TextTimeLimit;
                    mission.textDarkLegion                   = result.Data.TextDarkLegion;
                    mission.textRewards                      = result.Data.TextRewards;
                    mission.difficulty                       = result.Data.Difficulty;
                    mission.isSecondaryMissions              = result.Data.isSecondaryMissions;
                    mission.rewardDoomtrooperCredits         = result.Data.RewardDoomtrooperCredits;
                    mission.rewardDoomtrooperPromotionPoints = result.Data.RewardDoomtrooperPromotionPoints;
                    mission.rewardDoomtrooperItem            = result.Data.RewardDoomtrooperItem;
                    mission.rewardLegionCredits              = result.Data.RewardLegionCredits;
                    mission.rewardLegionPromotionPoints      = result.Data.RewardLegionPromotionPoints;
                    mission.rewardLegionItem                 = result.Data.RewardLegionItem;

                    mission.objectives                       = result.Data.Objectives;
                    //mission.sectorMaps                       = result.Data.SectorMaps;

                    Board.AddNewBoard(result.Data);

                    //array logic
                    Mission.currentMission = mission;

                    //GameGlobals.stage.addChild(mission);

                    if (firstTimeLoad == true) {
                        Setup.loadingStep++;
                        Setup.ProcessLoadingQueue();
                        break;
                    } else {
                        return mission.missionNumber;
                    }
                default:
                    GameGlobals.error.html("Mission " + missionNumber + " was not found in the database");
                    break;
            }
        },
        error: function () {
            GameGlobals.error.html("There was an unknown error while trying to load mission " + missionNumber + " data");
        }
    });
}