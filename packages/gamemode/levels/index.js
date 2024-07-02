const DB = require("./database");
const requiredExperiences = require("./xpdata"); // 8000 levels from GTA Online - credit: https://pastebin.com/fFkUygTy
const maxLevel = requiredExperiences.length - 1;
const maxExperience = requiredExperiences[maxLevel];

const clamp = (value, min, max) => {
    return value <= min ? min : value >= max ? max : value;
};

const levelFromXP = (xp) => {
    return clamp(requiredExperiences.findIndex(lvlXP => lvlXP >= xp), 1, maxLevel);
};

DB.Connect(() => {
    console.log(`[Levels] MaxLevel: ${maxLevel} - MaxExperience: ${maxExperience}`);

    DB.Pool.query("CREATE TABLE IF NOT EXISTS `playerlevels` (`ID` int(11) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY, `Name` varchar(24) NOT NULL, `Level` smallint(6) UNSIGNED NOT NULL DEFAULT 1, `Experience` int(11) UNSIGNED NOT NULL) ENGINE=InnoDB DEFAULT CHARSET=utf8;", (err) => {
        if (err) console.log(`[Levels Init Error] ${err.message}`);
    });
});

mp.events.add("playerReady", (player) => {
    // Sets the player's level to newLevel. (will also change player's XP)
    player.setLevel = function(newLevel) {
        let prevLevel = this.data.currentLevel;
        this.data.currentLevel = clamp(newLevel, 1, maxLevel);

        if (this.data.currentLevel != prevLevel) {
            let prevXP = this.data.currentXP;
            this.data.currentXP = requiredExperiences[this.data.currentLevel - 1] + ((this.data.currentLevel > 1) ? 1 : 0);

            if (this.data.currentXP != prevXP) mp.events.call("playerXPChange", this, prevXP, this.data.currentXP, this.data.currentXP - prevXP);
            mp.events.call("playerLevelChange", this, prevLevel, this.data.currentLevel);
            this.call("updateRankBar", [requiredExperiences[this.data.currentLevel - 1], requiredExperiences[this.data.currentLevel], prevXP]);
        }
    };

    // Sets the player's experience to newXP.
    player.setXP = function(newXP) {
        let prevXP = this.data.currentXP;
        this.data.currentXP = clamp(newXP, 0, maxExperience);

        if (this.data.currentXP != prevXP) {
            mp.events.call("playerXPChange", this, prevXP, this.data.currentXP, this.data.currentXP - prevXP);

            let calculatedLevel = levelFromXP(this.data.currentXP);
            if (this.data.currentLevel != calculatedLevel) {
                mp.events.call("playerLevelChange", this, this.data.currentLevel, calculatedLevel);
                this.data.currentLevel = calculatedLevel;
            }

            this.call("updateRankBar", [requiredExperiences[this.data.currentLevel - 1], requiredExperiences[this.data.currentLevel], prevXP]);
        }
    };

    // Changes the player's experience by xpAmount.
    player.changeXP = function(xpAmount) {
        let prevXP = this.data.currentXP;
        this.data.currentXP = clamp(prevXP + xpAmount, 0, maxExperience);

        if (this.data.currentXP != prevXP) {
            mp.events.call("playerXPChange", this, prevXP, this.data.currentXP, this.data.currentXP - prevXP);

            let calculatedLevel = levelFromXP(this.data.currentXP);
            if (this.data.currentLevel != calculatedLevel) {
                mp.events.call("playerLevelChange", this, this.data.currentLevel, calculatedLevel);
                this.data.currentLevel = calculatedLevel;
            }

            this.call("updateRankBar", [requiredExperiences[this.data.currentLevel - 1], requiredExperiences[this.data.currentLevel], prevXP]);
        }
    };

    // Returns whether the player reached the max level or not.
    player.hasReachedMaxLevel = function() {
        return this.data.currentLevel >= maxLevel && this.data.currentXP >= maxExperience;
    };

    // Saves the player's level and XP data.
    player.saveLevelAndXP = function() {
        if (this.data.currentLevel !== undefined && this.data.currentXP !== undefined) {
            DB.Pool.query("UPDATE playerlevels SET Level=?, Experience=? WHERE Name=?", [this.data.currentLevel, this.data.currentXP, this.name], (err) => {
                if (err) console.log(`[Levels Save Error] ${err.message}`);
            });
        }
    };

    // Load player data
    DB.Pool.query("SELECT Level, Experience FROM playerlevels WHERE Name=? LIMIT 1", [player.name], (err, rows) => {
        if (err) {
            console.log(`[Levels Load Error] ${err.message}`);
            player.data.currentLevel = 1;
            player.data.currentXP = 0;
        } else {
            if (rows.length > 0) {
                player.data.currentLevel = clamp(rows[0].Level, 1, maxLevel);
                player.data.currentXP = clamp(rows[0].Experience, 0, maxExperience);
            } else {
                DB.Pool.query("INSERT INTO playerlevels SET Name=?", [player.name], (insertError) => {
                    if (insertError) console.log(`[Levels Insert Error] ${err.message}`);
                    player.data.currentLevel = 1;
                    player.data.currentXP = 0;
                });
            }
        }
    });
});

mp.events.add("playerQuit", (player) => {
    player.saveLevelAndXP();
});