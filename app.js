const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
    };
  },
  computed: {
    monsterBarStyle() {
      return { width: this.monsterHealth + "%" };
    },
    playerBarStyle() {
      return { width: this.playerHealth + "%" };
    },
    mayUseSpecialAttack() {
      return this.currentRound % 3 === 0 ? false : true;
    },
  },
  methods: {
    getRandomValue(min, max) {
      console.log("Calcuate random value...");
      return Math.floor(Math.random() * (max - min)) + min;
    },
    attackMonster() {
      const attackValue = this.getRandomValue(5, 12);
      this.monsterHealth -= attackValue;
      this.attackPlayer();
    },
    attackPlayer() {
      this.currentRound++;
      const attackValue = this.getRandomValue(8, 15);
      this.playerHealth -= attackValue;
      console.log("Current Round: " + this.currentRound);
      console.log("isDisabled: " + this.isDisabled);
    },
    specialAttackMonster() {
      const attackValue = this.getRandomValue(10, 25);
      this.monsterHealth -= attackValue;
      this.attackPlayer();
    },
    healPlayer() {
      const healValue = this.getRandomValue(8, 20);
      if (this.playerHealth + healValue > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healValue;
      }
      this.attackPlayer();
    },
  },
});

app.mount("#game");
