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
GameConstants.Setup.LOADINGSTEP_UNITS = 0;
GameConstants.Setup.LOADINGSTEP_PLAYERS = 1;
GameConstants.Setup.LOADINGSTEP_CORPORATIONS = 6;
GameConstants.Setup.LOADINGSTEP_MISSIONS = 7;
GameConstants.Setup.LOADINGSTEP_ITEMS = 8;
//GameConstants.Setup.LOADINGSTEP_OVERLAY = 9;
GameConstants.Setup.LOADINGSTEP_COMPLETE = 9;
 
GameConstants.Images = new Object();
GameConstants.Images.MISSING = "missing.png";
GameConstants.Images.NONE = "none.png";
GameConstants.Images.BUTTON_CHOOSE = "menu/btnChoose.png";
GameConstants.Images.ICON_UNKNOWN = "menu/QuestionMark.png";
GameConstants.Images.ICON_DOOMTROOPER = "menu/Doomtrooper.jpg";
GameConstants.Images.ICON_HEALTH = "menu/HealthIcon.jpg";
GameConstants.Images.ICON_ACTIONS = "menu/ActionsIcon.png";
GameConstants.Images.ICON_ADDACTION = "menu/green_plus.png";
GameConstants.Images.DECAL_DOOMTROOPER = "decals/backWhite.png";
GameConstants.Images.DECAL_SELECTED = "decals/backYellow.png";
GameConstants.Images.DECAL_TARGETED = "decals/backRed.png";
GameConstants.Images.DECAL_BOTH = "decals/backPurple.png";
GameConstants.Images.DECAL_BASE = "decals/base.png";
GameConstants.Images.DECAL_ENTRANCE_DOOMTROOPERS = "decals/doomEntrance.png";
GameConstants.Images.DECAL_ENTRANCE_LEGION = "decals/legionEntrance.png";
GameConstants.Images.DECAL_ENTRANCE_BOTH = "decals/bothEntrance.png";
GameConstants.Images.DICE_WHITE_HIT = "dice/White-Hit.png";
GameConstants.Images.DICE_WHITE_BLANK = "dice/White-Blank.png";
GameConstants.Images.DICE_RED_HIT = "dice/Red-Hit.png";
GameConstants.Images.DICE_RED_BLANK = "dice/Red-Blank.png";
GameConstants.Images.DICE_BLACK_HIT = "dice/Black-Hit.png";
GameConstants.Images.DICE_BLACK_BLANK = "dice/Black-Blank.png";

GameConstants.Colors = new Object();
GameConstants.Colors.WHITE          = "FFFFFF";
GameConstants.Colors.DISABLEDGRAY   = "222222";
GameConstants.Colors.SELECTEDGRAY   = "444444";
GameConstants.Colors.LIGHTGRAY      = "666666";
GameConstants.Colors.LIGHTERGRAY    = "AAAAAA";
GameConstants.Colors.GREEN          = "009900";
GameConstants.Colors.RED            = "990000";