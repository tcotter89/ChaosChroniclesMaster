var GameGlobals = {};
var GameConstants = {};

// constants
GameConstants.CANVAS_WIDTH = 1600;
GameConstants.CANVAS_HEIGHT = 900;
GameConstants.IMAGESROOT = "../Images/";
GameConstants.MAXRANKS = 6;

GameConstants.MOVEMENTGRIDSIZEX = 3;
GameConstants.MOVEMENTGRIDSIZEY = 3;

GameConstants.Setup = new Object();
GameConstants.Setup.LOADINGSTEP_MISSIONS = 0;
//GameConstants.Setup.LOADINGSTEP_SECTORS = 1;
GameConstants.Setup.LOADINGSTEP_PLAYERS = 1;
GameConstants.Setup.LOADINGSTEP_DOOMTROOPERS = 5;
GameConstants.Setup.LOADINGSTEP_LEGION = 11;
GameConstants.Setup.LOADINGSTEP_ITEMS = 12;
GameConstants.Setup.LOADINGSTEP_OVERLAY = 13;
GameConstants.Setup.LOADINGSTEP_COMPLETE = 14;
 
GameConstants.Images = new Object();
GameConstants.Images.MISSING = "missing.png";
GameConstants.Images.NONE = "none.png";
GameConstants.Images.ICON_DOOMTROOPER = "menu/Doomtrooper.jpg";
GameConstants.Images.ICON_HEALTH = "menu/HealthIcon.jpg";
GameConstants.Images.ICON_ACTIONS = "menu/ActionsIcon.png";
GameConstants.Images.ICON_ADDACTION = "menu/green_plus.png";
GameConstants.Images.DECAL_DOOMTROOPER = "decals/backWhite.png"
GameConstants.Images.DECAL_SELECTED = "decals/backYellow.png";
GameConstants.Images.DECAL_TARGETED = "decals/backRed.png";
GameConstants.Images.DECAL_BOTH = "decals/backPurple.png";