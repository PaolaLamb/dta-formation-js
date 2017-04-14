import template from "./opponent.html";

class controller {
  constructor(FightService, PeerService) {
    this.FightService = FightService;
    this.PeerService = PeerService;
    this.PeerService.init(
      this.FightService.onDataReceived.bind(this.FightService)
    );
  }

  connect() {
    this.PeerService.connect(
      this.FightService.onDataReceived.bind(this.FightService)
    );
  }
}

export const OpponentComponent = {
  controller,
  template
};
