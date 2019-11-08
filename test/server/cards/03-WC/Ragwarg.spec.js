describe('Ragwarg', function() {
    integration(function() {
        describe('Ragwarg', function() {
            beforeEach(function() {
                this.setupTest({
                    player1: {
                        house: 'shadows',
                        amber: 2,
                        inPlay: ['ragwarg'],
                        hand: ['murkens']
                    },
                    player2: {
                        amber: 0,
                        inPlay: ['troll', 'grenade-snib'],
                        hand: ['bulwark']
                    }
                });
            });

            it('stuns the first creature to reap', function() {
                this.player1.endTurn();
                this.player2.clickPrompt('brobnar');
                this.player2.reap(this.grenadeSnib);
                expect(this.grenadeSnib.location).toBe('discard');
            });

            it('stuns a creature with an onReap', function() {
                this.player1.endTurn();
                this.player2.clickPrompt('brobnar');
                this.player2.reap(this.troll);
                this.player2.clickCard(this.troll);
                expect(this.troll.tokens.damage).toBe(2);
            });

            it('does not stun the second creature to reap', function() {
                this.player1.endTurn();
                this.player2.clickPrompt('brobnar');
                this.player2.reap(this.troll);
                this.player2.clickCard(this.troll);
                expect(this.troll.tokens.damage).toBe(2);
                this.player2.reap(this.grenadeSnib);
                expect(this.grenadeSnib.tokens.damage).toBe(undefined);
            });
        });
    });
});
