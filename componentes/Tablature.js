import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

const Tablature = ({ tablature, currentTime }) => {
    const numStrings = 6;
    const lines = Array.from({ length: numStrings }, () => []);

    // Agrupar las notas por cuerda
    tablature.forEach(note => {
        lines[note.string - 1].push(note);
    });

    // Estado para controlar las notas activas
    const [activeNotes, setActiveNotes] = useState([]);
    // Estado para la posición de la guía visual
    const [guidePosition, setGuidePosition] = useState({ index: 0, string: 0 });
    // Refs para los valores animados
    const animatedLeft = useRef(new Animated.Value(0)).current;
    const animatedTop = useRef(new Animated.Value(0)).current;

    // Función para determinar las notas activas y la posición de la guía visual
    useEffect(() => {
        // Filtrar las notas activas basadas en el currentTime
        const newActiveNotes = tablature.filter(note => {
            return note.time <= currentTime && note.time + 0.5 >= currentTime; // Margen de tiempo extendido para la activación
        });
        setActiveNotes(newActiveNotes);

        // Determinar la posición de la guía visual
        let guide = { index: 0, string: 0 };
        newActiveNotes.forEach((note, idx) => {
            if (note.time <= currentTime && currentTime <= note.time + 0.5) {
                const position = lines[note.string - 1].indexOf(note);
                if (position > guide.index) {
                    guide = { index: position, string: note.string - 1 };
                }
            }
        });

        setGuidePosition(guide);

        // Actualizar los valores animados
        Animated.spring(animatedLeft, {
            toValue: guide.index * 24,
            useNativeDriver: false
        }).start();

        Animated.spring(animatedTop, {
            toValue: guide.string * 26,
            useNativeDriver: false
        }).start();
    }, [currentTime, tablature]);

    // Etiquetas para identificar las cuerdas
    const stringLabels = ['E', 'B', 'G', 'D', 'A', 'E']; // Ajusta según tu afinación

    return (
        <View style={styles.tablature}>
            <View style={styles.leftColumn}>
                {/* Etiquetas de las cuerdas */}
                {stringLabels.map((label, index) => (
                    <Text key={index} style={styles.stringLabel}>{label}</Text>
                ))}
            </View>

            {/* Líneas de la tablatura */}
            <View style={styles.tablatureContent}>
                <Animated.Image
                    source={require('../image/ClaveSol.png')}
                    style={[
                        styles.ImagenG,
                        {
                            left: animatedLeft,
                            top: animatedTop
                        }
                    ]}
                />
                {lines.map((line, index) => (
                    <View key={index} style={styles.line}>
                        {line.map((note, idx) => {
                            const isActive = activeNotes.some(activeNote => activeNote === note);
                            const isGuide = isActive && idx === guidePosition.index && currentTime >= note.time;

                            return (
                                <Text
                                    key={idx}
                                    style={[
                                        styles.note,
                                        isActive && styles.activeNote,
                                        isGuide && styles.guideNote,
                                    ]}
                                >
                                    {note.fret === null ? '-' : note.fret}
                                </Text>
                            );
                        })}
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    tablature: {
        flexDirection: 'row', // Alineación horizontal para la etiqueta de las cuerdas
        padding: 20,
        fontFamily: 'monospace',
    },
    leftColumn: {
        marginRight: 10, // Espacio entre la etiqueta de las cuerdas y la tablatura
    },
    stringLabel: {
        textAlign: 'center',
        marginBottom: 5,
        fontWeight: 'bold',
        top: 10,
    },
    tablatureContent: {
        flex: 1, // Para ocupar el espacio restante horizontalmente
    },
    line: {
        flexDirection: 'row',
        marginBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        height: 20,
    },
    note: {
        paddingVertical: 0, // Ajustar el relleno vertical para mover las notas hacia arriba
        marginHorizontal: 2,
        width: 20,
        textAlign: 'center',
        fontSize: 16, // Ajustar el tamaño de fuente si es necesario
        top: 7,
    },
    activeNote: {
        backgroundColor: '#a9a7bf', // Cambiar el color aquí según tus preferencias
    },
    guideNote: {
        backgroundColor: '#a9a7bf', // Color de la guía visual
    },
    ImagenG: {
        width: 7, // Ajustar el ancho y la altura según el tamaño de la imagen
        height: 17,
        position: "absolute", // Posicionar la imagen absolutamente para alinearla correctamente
        tintColor: "black",
    },
});

export default Tablature;
//Animacion comprobada________________________________________________________________________________________________________________
// import React, { useState, useEffect, useRef } from 'react';
// import { View, Text, StyleSheet, Image, Animated } from 'react-native';

// const Tablature = ({ tablature, currentTime }) => {
//     const numStrings = 6;
//     const lines = Array.from({ length: numStrings }, () => []);

//     // Agrupar las notas por cuerda
//     tablature.forEach(note => {
//         lines[note.string - 1].push(note);
//     });

//     // Estado para controlar las notas activas
//     const [activeNotes, setActiveNotes] = useState([]);
//     // Estado para la posición de la guía visual
//     const [guidePosition, setGuidePosition] = useState({ index: 0, string: 0 });
//     // Ref para la posición animada
//     const animatedValue = useRef(new Animated.Value(0)).current;

//     // Función para determinar las notas activas y la posición de la guía visual
//     useEffect(() => {
//         // Filtrar las notas activas basadas en el currentTime
//         const newActiveNotes = tablature.filter(note => {
//             return note.time <= currentTime && note.time + 0.5 >= currentTime; // Margen de tiempo extendido para la activación
//         });
//         setActiveNotes(newActiveNotes);

//         // Determinar la posición de la guía visual
//         let guide = { index: 0, string: 0 };
//         newActiveNotes.forEach((note, idx) => {
//             if (note.time <= currentTime && currentTime <= note.time + 0.5) {
//                 const position = lines[note.string - 1].indexOf(note);
//                 if (position > guide.index) {
//                     guide = { index: position, string: note.string - 1 };
//                 }
//             }
//         });

//         setGuidePosition(guide);

//         // Actualizar el valor animado
//         Animated.timing(animatedValue, {
//             toValue: guide.index * 24,
//             duration: 500, // Ajustar la duración según sea necesario
//             useNativeDriver: false
//         }).start();

//     }, [currentTime, tablature]);

//     // Etiquetas para identificar las cuerdas
//     const stringLabels = ['E', 'B', 'G', 'D', 'A', 'E']; // Ajusta según tu afinación

//     return (
//         <View style={styles.tablature}>
//             <View style={styles.leftColumn}>
//                 {/* Etiquetas de las cuerdas */}
//                 {stringLabels.map((label, index) => (
//                     <Text key={index} style={styles.stringLabel}>{label}</Text>
//                 ))}
//             </View>

//             {/* Líneas de la tablatura */}
//             <View style={styles.tablatureContent}>
//                 <Animated.Image
//                     source={require('../image/ClaveSol.png')}
//                     style={[
//                         styles.ImagenG,
//                         {
//                             left: animatedValue,
//                             top: guidePosition.string * 26
//                         }
//                     ]}
//                 />
//                 {lines.map((line, index) => (
//                     <View key={index} style={styles.line}>
//                         {line.map((note, idx) => {
//                             const isActive = activeNotes.some(activeNote => activeNote === note);
//                             const isGuide = isActive && idx === guidePosition.index && currentTime >= note.time;

//                             return (
//                                 <Text
//                                     key={idx}
//                                     style={[
//                                         styles.note,
//                                         isActive && styles.activeNote,
//                                         isGuide && styles.guideNote,
//                                     ]}
//                                 >
//                                     {note.fret === null ? '-' : note.fret}
//                                 </Text>
//                             );
//                         })}
//                     </View>
//                 ))}
//             </View>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     tablature: {
//         flexDirection: 'row', // Alineación horizontal para la etiqueta de las cuerdas
//         padding: 20,
//         fontFamily: 'monospace',
//     },
//     leftColumn: {
//         marginRight: 10, // Espacio entre la etiqueta de las cuerdas y la tablatura
//     },
//     stringLabel: {
//         textAlign: 'center',
//         marginBottom: 5,
//         fontWeight: 'bold',
//         top: 10,
//     },
//     tablatureContent: {
//         flex: 1, // Para ocupar el espacio restante horizontalmente
//     },
//     line: {
//         flexDirection: 'row',
//         marginBottom: 5,
//         borderBottomWidth: 1,
//         borderBottomColor: 'black',
//         height: 20,
//     },
//     note: {
//         paddingVertical: 0, // Ajustar el relleno vertical para mover las notas hacia arriba
//         marginHorizontal: 2,
//         width: 20,
//         textAlign: 'center',
//         fontSize: 16, // Ajustar el tamaño de fuente si es necesario
//         top: 7,
//     },
//     activeNote: {
//         backgroundColor: 'yellow', // Cambiar el color aquí según tus preferencias
//     },
//     guideNote: {
//         backgroundColor: 'green', // Color de la guía visual
//     },
//     ImagenG: {
//         width: 7, // Ajustar el ancho y la altura según el tamaño de la imagen
//         height: 17,
//         position: "absolute", // Posicionar la imagen absolutamente para alinearla correctamente
//         tintColor: "black",
//     },
// });

// export default Tablature;

//_____________________________________________________________________________________________________________________
// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, Image } from 'react-native';

// const Tablature = ({ tablature, currentTime }) => {
//     const numStrings = 6;
//     const lines = Array.from({ length: numStrings }, () => []);

//     // Agrupar las notas por cuerda
//     tablature.forEach(note => {
//         lines[note.string - 1].push(note);
//     });

//     // Estado para controlar las notas activas
//     const [activeNotes, setActiveNotes] = useState([]);
//     // Estado para la posición de la guía visual
//     const [guidePosition, setGuidePosition] = useState({ index: 0, string: 0 });

//     // Función para determinar las notas activas y la posición de la guía visual
//     useEffect(() => {
//         // Filtrar las notas activas basadas en el currentTime
//         const newActiveNotes = tablature.filter(note => {
//             return note.time <= currentTime && note.time + 0.5 >= currentTime; // Margen de tiempo extendido para la activación
//         });
//         setActiveNotes(newActiveNotes);

//         // Determinar la posición de la guía visual
//         let guide = { index: 0, string: 0 };
//         newActiveNotes.forEach((note, idx) => {
//             if (note.time <= currentTime && currentTime <= note.time + 0.5) {
//                 const position = lines[note.string - 1].indexOf(note);
//                 if (position > guide.index) {
//                     guide = { index: position, string: note.string - 1 };
//                 }
//             }
//         });

//         setGuidePosition(guide);
//     }, [currentTime, tablature]);

//     // Etiquetas para identificar las cuerdas
//     const stringLabels = ['E', 'B', 'G', 'D', 'A', 'E']; // Ajusta según tu afinación

//     return (
//         <View style={styles.tablature}>
//             <View style={styles.leftColumn}>
//                 {/* Etiquetas de las cuerdas */}
//                 {stringLabels.map((label, index) => (
//                     <Text key={index} style={styles.stringLabel}>{label}</Text>
//                 ))}
//             </View>

//             {/* Líneas de la tablatura */}
//             <View style={styles.tablatureContent}>
//                 <Image
//                     source={require('../image/ClaveSol.png')}
//                     style={[
//                         styles.ImagenG,
//                         { left: guidePosition.index * 24, top: guidePosition.string * 26 }
//                     ]}
//                 />
//                 {lines.map((line, index) => (
//                     <View key={index} style={styles.line}>
//                         {line.map((note, idx) => {
//                             const isActive = activeNotes.some(activeNote => activeNote === note);
//                             const isGuide = isActive && idx === guidePosition.index && currentTime >= note.time;

//                             return (
//                                 <Text
//                                     key={idx}
//                                     style={[
//                                         styles.note,
//                                         isActive && styles.activeNote,
//                                         isGuide && styles.guideNote,
//                                     ]}
//                                 >
//                                     {note.fret === null ? '-' : note.fret}
//                                 </Text>
//                             );
//                         })}
//                     </View>
//                 ))}
//             </View>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     tablature: {
//         flexDirection: 'row', // Alineación horizontal para la etiqueta de las cuerdas
//         padding: 20,
//         fontFamily: 'monospace',
//     },
//     leftColumn: {
//         marginRight: 10, // Espacio entre la etiqueta de las cuerdas y la tablatura
//     },
//     stringLabel: {
//         textAlign: 'center',
//         marginBottom: 5,
//         fontWeight: 'bold',
//         top: 10,
//     },
//     tablatureContent: {
//         flex: 1, // Para ocupar el espacio restante horizontalmente
//     },
//     line: {
//         flexDirection: 'row',
//         marginBottom: 5,
//         borderBottomWidth: 1,
//         borderBottomColor: 'black',
//         height: 20,
//     },
//     note: {
//         paddingVertical: 0, // Ajustar el relleno vertical para mover las notas hacia arriba
//         marginHorizontal: 2,
//         width: 20,
//         textAlign: 'center',
//         fontSize: 16, // Ajustar el tamaño de fuente si es necesario
//         top: 7,
//     },
//     activeNote: {
//         backgroundColor: 'yellow', // Cambiar el color aquí según tus preferencias
//     },
//     guideNote: {
//         backgroundColor: 'green', // Color de la guía visual
//     },
//     ImagenG: {
//         width: 7, // Ajustar el ancho y la altura según el tamaño de la imagen
//         height: 17,
//         position: "absolute", // Posicionar la imagen absolutamente para alinearla correctamente
//         tintColor: "black",
        
//     },
// });

// export default Tablature;
//_____________________________________________________________________________________________________________________

// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, Image } from 'react-native';

// const Tablature = ({ tablature, currentTime }) => {
//     const numStrings = 6;
//     const lines = Array.from({ length: numStrings }, () => []);

//     // Agrupar las notas por cuerda
//     tablature.forEach(note => {
//         lines[note.string - 1].push(note);
//     });

//     // Estado para controlar las notas activas
//     const [activeNotes, setActiveNotes] = useState([]);
//     // Estado para la posición de la guía visual
//     const [guidePosition, setGuidePosition] = useState(0);

//     // Función para determinar las notas activas y la posición de la guía visual
//     useEffect(() => {
//         // Filtrar las notas activas basadas en el currentTime
//         const newActiveNotes = tablature.filter(note => {
//             return note.time <= currentTime && note.time + 0.5 >= currentTime; // Margen de tiempo extendido para la activación
//         });
//         setActiveNotes(newActiveNotes);

//         // Determinar la posición de la guía visual
//         let position = 0;
//         newActiveNotes.forEach((note, idx) => {
//             if (note.time <= currentTime && currentTime <= note.time + 0.5) {
//                 position = lines[note.string - 1].indexOf(note);
//             }
//         });

//         setGuidePosition(position);
//     }, [currentTime, tablature]);

//     // Etiquetas para identificar las cuerdas
//     const stringLabels = ['E', 'B', 'G', 'D', 'A', 'E']; // Ajusta según tu afinación

//     return (
//         <View style={styles.tablature}>
//             <View style={styles.leftColumn}>
//                 {/* Etiquetas de las cuerdas */}
//                 {stringLabels.map((label, index) => (
//                     <Text key={index} style={styles.stringLabel}>{label}</Text>
//                 ))}
//             </View>

//             {/* Líneas de la tablatura */}
//             <View style={styles.tablatureContent}>
//                 <Image
//                     source={require('../image/ClaveSol.png')}
//                     style={styles.ImagenG}
//                 ></Image>                          
//                 {lines.map((line, index) => (
//                     <View key={index} style={styles.line}>
//                         {line.map((note, idx) => {
//                             const isActive = activeNotes.some(activeNote => activeNote === note);
//                             const isGuide = isActive && idx === guidePosition && currentTime >= note.time;

//                             return (
//                                 <Text
//                                     key={idx}
//                                     style={[
//                                         styles.note,
//                                         isActive && styles.activeNote,
//                                         isGuide && styles.guideNote,
//                                     ]}
//                                 >
//                                     {note.fret === null ? '-' : note.fret}
//                                 </Text>
//                             );
//                         })}
//                     </View>
//                 ))}
//             </View>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     tablature: {
//         flexDirection: 'row', // Alineación horizontal para la etiqueta de las cuerdas
//         padding: 20,
//         fontFamily: 'monospace',
//     },
//     leftColumn: {
//         marginRight: 10, // Espacio entre la etiqueta de las cuerdas y la tablatura
//     },
//     stringLabel: {
//         textAlign: 'center',
//         marginBottom: 5,
//         fontWeight: 'bold',
//         top: 10,
//     },
//     tablatureContent: {
//         flex: 1, // Para ocupar el espacio restante horizontalmente
//     },
//     line: {
//         flexDirection: 'row',
//         marginBottom: 5,
//         borderBottomWidth: 1,
//         borderBottomColor: 'black',
//         height: 20,
//     },
//     note: {
//         paddingVertical: 0, // Ajustar el relleno vertical para mover las notas hacia arriba
//         marginHorizontal: 2,
//         width: 20,
//         textAlign: 'center',
//         fontSize: 16, // Ajustar el tamaño de fuente si es necesario
//         top: 7,
//     },
//     activeNote: {
//         backgroundColor: 'yellow', // Cambiar el color aquí según tus preferencias
//     },
//     guideNote: {
//         backgroundColor: 'green', // Color de la guía visual
//     },
//     ImagenG: {
//         width: 20, // Adjust width and height as per your image size
//         height: 40,
//         position: "absolute", // Position the image absolutely for accurate alignment
//         top: -30,
//         tintColor: "black",
//     },
// });

// export default Tablature;



