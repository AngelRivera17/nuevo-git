import React, { useEffect, useState } from 'react';
import { View, Button } from 'react-native';
import { Audio } from 'expo-av';

const Player = ({ audioSrc, onTimeUpdate }) => {
    const [sound, setSound] = useState();
    const [isPlaying, setIsPlaying] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const loadSound = async () => {
            const { sound } = await Audio.Sound.createAsync(audioSrc);
            setSound(sound);
        };

        loadSound();

        return () => {
            sound && sound.unloadAsync(); // Limpiar al desmontar
        };
    }, [audioSrc]);

    useEffect(() => {
        const interval = setInterval(async () => {
            const status = await sound.getStatusAsync();
            if (status.isLoaded) {
                onTimeUpdate(status.positionMillis / 400); // Actualiza el tiempo en segundos
            }
        }, 100);

        return () => clearInterval(interval); // Limpiar el intervalo
    }, [sound]);

    const handleStart = async () => {
        if (isInitialized) {
            await sound.stopAsync(); // Detener el audio
            setIsPlaying(false);
        } else {
            await sound.playAsync();
            setIsPlaying(true);
        }
        setIsInitialized(!isInitialized);
    };

    const handlePause = async () => {
        if (isPlaying) {
            await sound.pauseAsync();
            setIsPlaying(false);
        } else {
            await sound.playAsync();
            setIsPlaying(true);
        }
    };

    return (
        <View>
            <Button title={isInitialized ? "Detener" : "Iniciar"} onPress={handleStart} />
            <Button title={isPlaying ? "Pausar" : "Reanudar"} onPress={handlePause} />
        </View>
    );
};

export default Player;
//________________________________________________________funciono mejorado____
// import React, { useEffect, useState } from 'react';
// import { View, Button } from 'react-native';
// import { Audio } from 'expo-av';

// const Player = ({ audioSrc, onTimeUpdate }) => {
//     const [sound, setSound] = useState();
//     const [isPlaying, setIsPlaying] = useState(false);

//     useEffect(() => {
//         const loadSound = async () => {
//             const { sound } = await Audio.Sound.createAsync(audioSrc);
//             setSound(sound);
//             await sound.playAsync(); // Reproduce el audio al cargar
//             setIsPlaying(true);
//         };

//         loadSound();

//         return () => {
//             sound && sound.unloadAsync(); // Limpiar al desmontar
//         };
//     }, [audioSrc]);

//     useEffect(() => {
//         const interval = setInterval(async () => {
//             const status = await sound.getStatusAsync();
//             if (status.isLoaded) {
//                 onTimeUpdate(status.positionMillis / 1000); // Actualiza el tiempo en segundos
//             }
//         }, 100);

//         return () => clearInterval(interval); // Limpiar el intervalo
//     }, [sound]);

//     const handlePlayPause = async () => {
//         if (isPlaying) {
//             await sound.pauseAsync();
//         } else {
//             await sound.playAsync();
//         }
//         setIsPlaying(!isPlaying);
//     };

//     return (
//         <View>
//             <Button title={isPlaying ? "Pausar" : "Reanudar"} onPress={handlePlayPause} />
//         </View>
//     );
// };

// export default Player;

//________________________________________________________funciono
// import React, { useEffect } from 'react';
// import { Audio } from 'expo-av';

// const Player = ({ audioSrc, onTimeUpdate }) => {
//     const [sound, setSound] = React.useState();

//     useEffect(() => {
//         const loadSound = async () => {
//             const { sound } = await Audio.Sound.createAsync(audioSrc);
//             setSound(sound);
//             await sound.playAsync(); // Reproduce el audio al cargar
//         };

//         loadSound();

//         return () => {
//             sound && sound.unloadAsync(); // Limpiar al desmontar
//         };
//     }, [audioSrc]);

//     useEffect(() => {
//         const interval = setInterval(async () => {
//             const status = await sound.getStatusAsync();
//             if (status.isLoaded) {
//                 onTimeUpdate(status.positionMillis / 500); // Actualiza el tiempo en segundos
//             }
//         }, 100);

//         return () => clearInterval(interval); // Limpiar el intervalo
//     }, [sound]);

//     return null;
// };

// export default Player;


// // src/components/Player.js
// import React, { useEffect, useRef } from 'react';
// import { View, Button } from 'react-native';
// import { Audio } from 'expo-av';

// const Player = ({ audioSrc, onTimeUpdate }) => {
//   const sound = useRef(new Audio.Sound());

//   useEffect(() => {
//     const loadSound = async () => {
//       try {
//         await sound.current.loadAsync(audioSrc);
//         sound.current.setOnPlaybackStatusUpdate((status) => {
//           if (status.isLoaded && status.isPlaying) {
//             onTimeUpdate(status.positionMillis / 1000);
//           }
//         });
//       } catch (error) {
//         console.error('Error loading sound', error);
//       }
//     };

//     loadSound();

//     return () => {
//       sound.current.unloadAsync();
//     };
//   }, [audioSrc, onTimeUpdate]);

//   const handlePlayPause = async () => {
//     const status = await sound.current.getStatusAsync();
//     if (status.isPlaying) {
//       await sound.current.pauseAsync();
//     } else {
//       await sound.current.playAsync();
//     }
//   };

//   return (
//     <View>
//       <Button title="Play/Pause" onPress={handlePlayPause} />
//     </View>
//   );
// };

// export default Player;