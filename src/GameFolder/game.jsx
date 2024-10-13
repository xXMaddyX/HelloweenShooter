import Phaser from "phaser";
import { useEffect, useRef } from "react";
import SceneLvL1 from "./scenes/SceneWorld1/SceneWorld1";

function Game() {
    const gameRef = useRef(null);

    useEffect(() => {
        if (!gameRef.current) {
            gameRef.current = new Phaser.Game({
                type: Phaser.WEBGL,
                pixelArt: true,
                fps: {
                    target: 60,
                    forceSetTimeOut: true
                },
                scale: {
                    parent: "phaser-game",
                    mode: Phaser.Scale.FIT,
                    width: 1920,
                    height: 1080,
                },
                physics: {
                    default: "arcade",
                    arcade: {
                        gravity: 0,
                        //debug: true
                    }
                },
                input: {
                    keyboard: {
                        target: window,
                        preventDefault: false,
                    },
                },
                scene: [new SceneLvL1(this)],
            });
        }

        return () => {
            if (gameRef.current) {
                gameRef.current.destroy(true);
                gameRef.current = null;
            }
        };
    }, []);

    const handleFullscreen = () => {
        if (gameRef.current) {
            if (gameRef.current.scale.isFullscreen) {
                gameRef.current.scale.stopFullscreen();
                gameRef.current.scale.resize(1920, 1080);
            } else {
                gameRef.current.scale.startFullscreen();
                const fullscreenWidth = window.screen.width;
                const fullscreenHeight = window.screen.height;
                gameRef.current.scale.resize(fullscreenWidth, fullscreenHeight);
            }
        }
    };

    return (
        <div>
            <div id="phaser-game" />
            <button
                onClick={handleFullscreen}
                style={{
                    position: 'absolute',
                    zIndex: 1,
                    top: 10,
                    right: 10,
                    padding: '10px 20px',
                    fontSize: '16px'
                }}
            >
                Vollbild
            </button>
        </div>
    );
}

export default Game;