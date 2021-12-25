const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      winner: null,
      attackLog: [],
    };
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        // It's draw.
        this.winner = "draw";
      } else if (value <= 0) {
        // Player lost.
        this.winner = "monster";
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        // It's draw.
        this.winner = "draw";
      } else if (value <= 0) {
        // Monster lost.
        this.winner = "player";
      }
    },
  },
  computed: {
    monsterBarStyle() {
      if (this.monsterHealth < 0) {
        return { width: "0%" };
      }

      return { width: this.monsterHealth + "%" };
    },
    playerBarStyle() {
      if (this.playerHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.playerHealth + "%" };
    },
    mayUseSpecialAttack() {
      return this.currentRound % 3 === 0 ? false : true;
    },
  },
  methods: {
    startGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.currentRound = 0;
      this.winner = null;
    },
    getRandomValue(min, max) {
      console.log("Calcuate random value...");
      return Math.floor(Math.random() * (max - min)) + min;
    },
    attackMonster() {
      const attackValue = this.getRandomValue(5, 12);
      this.monsterHealth -= attackValue;
      this.addAttackLogMessage("player", "attack", attackValue);
      this.attackPlayer();
    },
    attackPlayer() {
      this.currentRound++;
      const attackValue = this.getRandomValue(8, 15);
      this.playerHealth -= attackValue;
      this.addAttackLogMessage("monster", "attack", attackValue);
    },
    specialAttackMonster() {
      const attackValue = this.getRandomValue(10, 25);
      this.monsterHealth -= attackValue;
      this.addAttackLogMessage("player", "attack", attackValue);
      this.attackPlayer();
    },
    healPlayer() {
      const healValue = this.getRandomValue(8, 20);
      if (this.playerHealth + healValue > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healValue;
      }
      this.addAttackLogMessage("player", "heal", healValue);
      this.attackPlayer();
    },
    surrender() {
      this.winner = "monster";
    },
    addAttackLogMessage(who, what, value) {
      // Debugging
      console.log("I am in addAttackLogMessage().");

      this.attackLog.unshift({
        attackBy: who,
        attackType: what,
        attackValue: value,
      });
    },
  },
});

app.mount("#game");
