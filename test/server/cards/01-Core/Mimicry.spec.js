describe('Mimicry', function() {
    integration(function() {
        describe('Mimicry\'s ability', function() {
            beforeEach(function() {
                this.setupTest({
                    player1: {
                        house: 'untamed',
                        hand: [],
                        inPlay: ['batdrone'],
                        discard: ['snufflegator', 'mimicry']
                    },
                    player2: {
                        amber: 5,
                        discard: ['neuro-syphon', 'wild-wormhole']
                    }
                });
                this.player1.moveCard(this.snufflegator, 'deck');
                this.player1.moveCard(this.mimicry, 'hand');
            });

            it('should work correctly with Neuro Syphon', function() {
                this.player1.play(this.mimicry);
                expect(this.player1).toHavePrompt('Mimicry');
                expect(this.player1).toBeAbleToSelect(this.neuroSyphon);
                this.player1.clickCard(this.neuroSyphon);
                expect(this.player1.amber).toBe(2);
                expect(this.player2.amber).toBe(4);
                expect(this.player1.hand.length).toBe(1);
            });

            it('should work correctly with Wild Wormhole', function() {
                this.player1.play(this.mimicry);
                expect(this.player1).toHavePrompt('Mimicry');
                expect(this.player1).toBeAbleToSelect(this.wildWormhole);
                this.player1.clickCard(this.wildWormhole);
                expect(this.player1.amber).toBe(1);
                expect(this.player1).toHavePrompt('Snufflegator');
                this.player1.clickPrompt('Left');
                expect(this.snufflegator.location).toBe('play area');
                expect(this.snufflegator.controller).toBe(this.player1.player);
                expect(this.player1.player.cardsInPlay).toContain(this.snufflegator);
            });
        });

        describe('Mimicry/Wild Wormhole interaction', function() {
            beforeEach(function() {
                this.setupTest({
                    player1: {
                        house: 'logos',
                        hand: ['wild-wormhole'],
                        inPlay: ['batdrone'],
                        discard: ['mimicry']
                    },
                    player2: {
                        amber: 5,
                        discard: ['neuro-syphon']
                    }
                });
                this.player1.moveCard(this.mimicry, 'deck');
            });

            it('should work correctly', function() {
                this.player1.play(this.wildWormhole);
                expect(this.player1).toHavePrompt('Mimicry');
                expect(this.player1).toBeAbleToSelect(this.neuroSyphon);
                this.player1.clickCard(this.neuroSyphon);
                expect(this.player1.amber).toBe(3);
                expect(this.player2.amber).toBe(4);
                expect(this.player1.hand.length).toBe(1);
            });
        });
    });
});
