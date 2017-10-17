const DrawCard = require('../../drawcard.js');

class IdeTrader extends DrawCard {
    setupCardAbilities(ability) {
        this.reaction({
            when: {
                onMoveCharactersToConflict: () => this.isParticipating()
            },
            limit: ability.limit.perConflict(1),
            handler: () => this.game.promptWithHandlerMenu(this.controller, {
                source: this,
                choices: ['Gain 1 fate', 'Draw 1 card'],
                handlers: [
                    () => {
                        this.game.addMessage('{0} uses {1} to gain 1 fate', this.controller, this);
                        this.game.addFate(this.controller, 1);
                    },
                    () => {
                        this.game.addMessage('{0} uses {1} to draw 1 card', this.controller, this);
                        this.controller.drawCardsToHand(1);
                    }
                ]
            })
        });
    }
}

IdeTrader.id = 'ide-trader';

module.exports = IdeTrader;
