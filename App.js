import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Player from '../componentes/Player';
import Tablature from '../componentes/Tablature';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

const sampleTablature = [
    // ... (tu tablatura aquí)
    { string: 1, fret: null, time: 0.1 },
    { string: 2, fret: null, time: 0.1 },
    { string: 3, fret: 2, time: 0.1 },
    { string: 4, fret: 2, time: 0.1 },
    { string: 5, fret: 0, time: 0.1 },
    { string: 6, fret: null, time: 0.1 },

    { string: 1, fret: null, time: 0.5 },
    { string: 2, fret: null, time: 0.5 },
    { string: 3, fret: 0, time: 0.5 },
    { string: 4, fret: 0, time: 0.5 },
    { string: 5, fret: 0, time: 0.5 },
    { string: 6, fret: null, time: 0.5 },

    { string: 1, fret: null, time: 1 },
    { string: 2, fret: null, time: 1 },
    { string: 3, fret: null, time: 1 },
    { string: 4, fret: 2, time: 1 },
    { string: 5, fret: 2, time: 1 },
    { string: 6, fret: 0, time: 1},

    { string: 1, fret: null, time: 1.5 },
    { string: 2, fret: null, time: 1.5 },
    { string: 3, fret: null, time: 1.5  },
    { string: 4, fret: 2, time: 1.5  },
    { string: 5, fret: 2, time: 1.5  },
    { string: 6, fret: 0, time: 1.5  },

    { string: 1, fret: null, time: 2},
    { string: 2, fret: null, time: 2 },
    { string: 3, fret: null, time: 2 },
    { string: 4, fret: 0, time: 2 },
    { string: 5, fret: 0, time: 2 },
    { string: 6, fret: 0, time: 2},

    { string: 1, fret: null, time: 2.5 },
    { string: 2, fret: null, time: 2.5 },
    { string: 3, fret: 2, time: 2.5 },
    { string: 4, fret: 2, time: 2.5 },
    { string: 5, fret: 0, time: 2.5 },
    { string: 6, fret: null, time: 2.5 },

    { string: 1, fret: null, time: 3 },
    { string: 2, fret: null, time: 3 },
    { string: 3, fret: 2, time: 3 },
    { string: 4, fret: 2, time: 3 },
    { string: 5, fret: 0, time: 3 },
    { string: 6, fret: null, time: 3 },

    { string: 1, fret: null, time: 3.5 },
    { string: 2, fret: null, time: 3.5 },
    { string: 3, fret: 0, time: 3.5 },
    { string: 4, fret: 0, time: 3.5 },
    { string: 5, fret: 0, time: 3.5 },
    { string: 6, fret: null, time: 3.5 },

    { string: 1, fret: null, time: 4 },
    { string: 2, fret: 3, time: 4 },
    { string: 3, fret: 2, time: 4 },
    { string: 4, fret: 0, time: 4 },
    { string: 5, fret: null, time: 4 },
    { string: 6, fret: null, time: 4 },

    { string: 1, fret: null, time: 4.5 },
    { string: 2, fret: 3, time: 4.5 },
    { string: 3, fret: 2, time: 4.5 },
    { string: 4, fret: 0, time: 4.5 },
    { string: 5, fret: null, time: 4.5 },
    { string: 6, fret: null, time: 4.5 },

    { string: 1, fret: null, time: 5 },
    { string: 2, fret: 0, time: 5 },
    { string: 3, fret: 0, time: 5 },
    { string: 4, fret: 0, time: 5 },
    { string: 5, fret: null, time: 5 },
    { string: 6, fret: null, time: 5 },

    { string: 1, fret: null, time: 5.5 },
    { string: 2, fret: null, time: 5.5 },
    { string: 3, fret: 2, time: 5.5 },
    { string: 4, fret: 2, time: 5.5 },
    { string: 5, fret: 0, time: 5.5 },
    { string: 6, fret: null, time: 5.5 },

    { string: 1, fret: null, time: 5.5 },
    { string: 2, fret: null, time: 5.5 },
    { string: 3, fret: 2, time: 5.5 },
    { string: 4, fret: 2, time: 5.5 },
    { string: 5, fret: 0, time: 5.5 },
    { string: 6, fret: null, time: 5.5 },

    { string: 1, fret: null, time: 5.5 },
    { string: 2, fret: null, time: 5.5 },
    { string: 3, fret: 0, time: 5.5 },
    { string: 4, fret: 0, time: 5.5 },
    { string: 5, fret: 0, time: 5.5 },
    { string: 6, fret: null, time: 5.5 },

    { string: 1, fret: null, time: 6 },
    { string: 2, fret: null, time: 6 },
    { string: 3, fret: null, time: 6 },
    { string: 4, fret: 2, time: 6 },
    { string: 5, fret: 2, time: 6 },
    { string: 6, fret: 0, time: 6},

    { string: 1, fret: null, time: 6.6 },
    { string: 2, fret: null, time: 6.6 },
    { string: 3, fret: null, time: 6.6 },
    { string: 4, fret: 2, time: 6.6 },
    { string: 5, fret: 2, time: 6.6 },
    { string: 6, fret: 0, time: 6.6},

    { string: 1, fret: null, time: 7 },
    { string: 2, fret: null, time: 7 },
    { string: 3, fret: null, time: 7 },
    { string: 4, fret: 0, time: 7 },
    { string: 5, fret: 0, time: 7 },
    { string: 6, fret: 0, time: 7},

    { string: 1, fret: null, time: 7.5 },
    { string: 2, fret: 3, time: 7.5 },
    { string: 3, fret: 2, time: 7.5 },
    { string: 4, fret: 0, time: 7.5 },
    { string: 5, fret: null, time: 7.5 },
    { string: 6, fret: null, time: 7.5 },

    { string: 1, fret: null, time: 8 },
    { string: 2, fret: 3, time: 8 },
    { string: 3, fret: 2, time: 8 },
    { string: 4, fret: 0, time: 8 },
    { string: 5, fret: null, time: 8 },
    { string: 6, fret: null, time: 8 },

    { string: 1, fret: null, time: 8.5 },
    { string: 2, fret: null, time: 8.5 },
    { string: 3, fret: 0, time: 8.5 },
    { string: 4, fret: 0, time: 8.5 },
    { string: 5, fret: 0, time: 8.5 },
    { string: 6, fret: null, time: 8.5 },

    { string: 1, fret: null, time: 9 },
    { string: 2, fret: null, time: 9 },
    { string: 3, fret: null, time: 9 },
    { string: 4, fret: 2, time: 9 },
    { string: 5, fret: 2, time: 9 },
    { string: 6, fret: 0, time: 9},

    { string: 1, fret: null, time: 9.5 },
    { string: 2, fret: null, time: 9.5 },
    { string: 3, fret: null, time: 9.5 },
    { string: 4, fret: 2, time: 9.5 },
    { string: 5, fret: 2, time: 9.5 },
    { string: 6, fret: 0, time: 9.5},

    { string: 1, fret: null, time: 10 },
    { string: 2, fret: null, time: 10 },
    { string: 3, fret: null, time: 10 },
    { string: 4, fret: 2, time: 10 },
    { string: 5, fret: 2, time: 10 },
    { string: 6, fret: 0, time: 10},

    { string: 1, fret: null, time: 10.5 },
    { string: 2, fret: null, time: 10.5 },
    { string: 3, fret: null, time: 10.5 },
    { string: 4, fret: 2, time: 10.5 },
    { string: 5, fret: 2, time: 10.5 },
    { string: 6, fret: 0, time: 10.5},

    { string: 1, fret: null, time: 11 },
    { string: 2, fret: null, time: 11 },
    { string: 3, fret: null, time: 11 },
    { string: 4, fret: 2, time: 11 },
    { string: 5, fret: 2, time: 11 },
    { string: 6, fret: 0, time: 11},
//_______________________________________________________________

    { string: 1, fret: null, time: 11.5 },
    { string: 2, fret: null, time: 11.5 },
    { string: 3, fret: 2, time: 11.5 },
    { string: 4, fret: 2, time: 11.5 },
    { string: 5, fret: 0, time: 11.5 },
    { string: 6, fret: null, time: 11.5 },

    { string: 1, fret: null, time: 12 },
    { string: 2, fret: null, time: 12 },
    { string: 3, fret: 0, time: 12 },
    { string: 4, fret: 0, time: 12 },
    { string: 5, fret: 0, time: 12 },
    { string: 6, fret: null, time: 12 },

    { string: 1, fret: null, time: 12.5 },
    { string: 2, fret: null, time: 12.5 },
    { string: 3, fret: null, time: 12.5 },
    { string: 4, fret: 2, time: 12.5 },
    { string: 5, fret: 2, time: 12.5 },
    { string: 6, fret: 0, time: 12.5},

    { string: 1, fret: null, time: 13 },
    { string: 2, fret: null, time: 13 },
    { string: 3, fret: null, time: 13  },
    { string: 4, fret: 2, time: 13  },
    { string: 5, fret: 2, time: 13  },
    { string: 6, fret: 0, time: 13  },

    { string: 1, fret: null, time: 13.5},
    { string: 2, fret: null, time: 13.5 },
    { string: 3, fret: null, time: 13.5 },
    { string: 4, fret: 0, time: 13.5 },
    { string: 5, fret: 0, time: 13.5 },
    { string: 6, fret: 0, time: 13.5},

    { string: 1, fret: null, time: 14 },
    { string: 2, fret: null, time: 14 },
    { string: 3, fret: 2, time: 14 },
    { string: 4, fret: 2, time: 14 },
    { string: 5, fret: 0, time: 14 },
    { string: 6, fret: null, time: 14 },

    { string: 1, fret: null, time: 14.5 },
    { string: 2, fret: null, time: 14.5 },
    { string: 3, fret: 2, time: 14.5 },
    { string: 4, fret: 2, time: 14.5 },
    { string: 5, fret: 0, time: 14.5 },
    { string: 6, fret: null, time: 14.5 },

    { string: 1, fret: null, time: 15 },
    { string: 2, fret: null, time: 15 },
    { string: 3, fret: 0, time: 15 },
    { string: 4, fret: 0, time: 15 },
    { string: 5, fret: 0, time: 15 },
    { string: 6, fret: null, time: 15 },

    { string: 1, fret: null, time: 15.5 },
    { string: 2, fret: 3, time: 15.5 },
    { string: 3, fret: 2, time: 15.5 },
    { string: 4, fret: 0, time: 15.5 },
    { string: 5, fret: null, time: 15.5 },
    { string: 6, fret: null, time: 15.5 },

    { string: 1, fret: null, time: 16 },
    { string: 2, fret: 3, time: 16 },
    { string: 3, fret: 2, time: 16 },
    { string: 4, fret: 0, time: 16 },
    { string: 5, fret: null, time: 16 },
    { string: 6, fret: null, time: 16 },

    { string: 1, fret: null, time: 16.5 },
    { string: 2, fret: 0, time: 16.5 },
    { string: 3, fret: 0, time: 16.5 },
    { string: 4, fret: 0, time: 16.5 },
    { string: 5, fret: null, time: 16.5 },
    { string: 6, fret: null, time: 16.5 },

    { string: 1, fret: null, time: 17 },
    { string: 2, fret: null, time: 17 },
    { string: 3, fret: 2, time: 17 },
    { string: 4, fret: 2, time: 17 },
    { string: 5, fret: 0, time: 17 },
    { string: 6, fret: null, time: 17 },

    { string: 1, fret: null, time: 17.5 },
    { string: 2, fret: null, time: 17.5 },
    { string: 3, fret: 2, time: 17.5 },
    { string: 4, fret: 2, time: 17.5 },
    { string: 5, fret: 0, time: 17.5 },
    { string: 6, fret: null, time: 17.5 },

    { string: 1, fret: null, time: 18 },
    { string: 2, fret: null, time: 18 },
    { string: 3, fret: 0, time: 18 },
    { string: 4, fret: 0, time: 18 },
    { string: 5, fret: 0, time: 18 },
    { string: 6, fret: null, time: 18 },

    { string: 1, fret: null, time: 18.5 },
    { string: 2, fret: null, time: 18.5 },
    { string: 3, fret: null, time: 18.5 },
    { string: 4, fret: 2, time: 18.5 },
    { string: 5, fret: 2, time: 18.5 },
    { string: 6, fret: 0, time: 18.5},

    { string: 1, fret: null, time: 19 },
    { string: 2, fret: null, time: 19 },
    { string: 3, fret: null, time: 19 },
    { string: 4, fret: 2, time: 19 },
    { string: 5, fret: 2, time: 19 },
    { string: 6, fret: 0, time: 19},

    { string: 1, fret: null, time: 19.5 },
    { string: 2, fret: null, time: 19.5 },
    { string: 3, fret: null, time: 19.5 },
    { string: 4, fret: 0, time: 19.5 },
    { string: 5, fret: 0, time: 19.5 },
    { string: 6, fret: 0, time: 19.5},

    { string: 1, fret: null, time: 20 },
    { string: 2, fret: null, time: 20 },
    { string: 3, fret: 2, time: 20 },
    { string: 4, fret: 2, time: 20 },
    { string: 5, fret: 0, time: 20 },
    { string: 6, fret: null, time: 20 },

    { string: 1, fret: null, time: 20.5 },
    { string: 2, fret: null, time: 20.5 },
    { string: 3, fret: 2, time: 20.5 },
    { string: 4, fret: 2, time: 20.5 },
    { string: 5, fret: 0, time: 20.5 },
    { string: 6, fret: null, time: 20.5 },

    { string: 1, fret: null, time: 21 },
    { string: 2, fret: null, time: 21 },
    { string: 3, fret: 2, time: 21 },
    { string: 4, fret: 0, time: 21 },
    { string: 5, fret: 0, time: 21 },
    { string: 6, fret: null, time: 21 },

    { string: 1, fret: null, time: 21.5 },
    { string: 2, fret: null, time: 21.5 },
    { string: 3, fret: 2, time: 21.5 },
    { string: 4, fret: 2, time: 21.5 },
    { string: 5, fret: 0, time: 21.5 },
    { string: 6, fret: null, time: 21.5},

    { string: 1, fret: null, time: 22 },
    { string: 2, fret: null, time: 22 },
    { string: 3, fret: 2, time: 22 },
    { string: 4, fret: 2, time: 22 },
    { string: 5, fret: 0, time: 22 },
    { string: 6, fret: null, time: 22},

    { string: 1, fret: null, time: 22.5 },
    { string: 2, fret: null, time: 22.5 },
    { string: 3, fret: 2, time: 22.5 },
    { string: 4, fret: 2, time: 22.5 },
    { string: 5, fret: 0, time: 22.5 },
    { string: 6, fret: null, time: 22.5},

    { string: 1, fret: null, time: 23 },
    { string: 2, fret: null, time: 23 },
    { string: 3, fret: 2, time: 23 },
    { string: 4, fret: 2, time: 23 },
    { string: 5, fret: 0, time: 23 },
    { string: 6, fret: null, time: 23},

    { string: 1, fret: null, time: 23.5 },
    { string: 2, fret: null, time: 23.5 },
    { string: 3, fret: 2, time: 23.5 },
    { string: 4, fret: 2, time: 23.5 },
    { string: 5, fret: 0, time: 23.5 },
    { string: 6, fret: null, time: 23.5},

    { string: 1, fret: null, time: 24 },
    { string: 2, fret: null, time: 24 },
    { string: 3, fret: 2, time: 24 },
    { string: 4, fret: 2, time: 24 },
    { string: 5, fret: 0, time: 24 },
    { string: 6, fret: null, time: 24},
];

const App = () => {
    const [currentTime, setCurrentTime] = useState(0);
    const scrollViewRef = useRef(null);

    const handleTimeUpdate = (time) => {
        setCurrentTime(time);
    };

    useEffect(() => {
        const guidePosition = sampleTablature.findIndex(note => currentTime < note.time);
        if (guidePosition > 0) {
            const prevNoteTime = sampleTablature[guidePosition - 1].time;
            const nextNoteTime = sampleTablature[guidePosition].time;
            
            // Interpolación suave entre las notas
            const totalDuration = nextNoteTime - prevNoteTime;
            const progress = (currentTime - prevNoteTime) / totalDuration;
            const xPosition = (guidePosition - 1) * wp(0.4) + progress * wp(0.2);
            
            scrollViewRef.current.scrollTo({ x: xPosition, animated: true });
        }
    }, [currentTime]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tablature Player</Text>
            <Player audioSrc={require('./assets/AudiosRock/Green Day - The Grouch.mp3')} onTimeUpdate={handleTimeUpdate} />
            <ScrollView
                ref={scrollViewRef}
                style={styles.scrollView}
                contentContainerStyle={styles.scrollViewContent}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
            >
                <Tablature tablature={sampleTablature} currentTime={currentTime} />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    scrollView: {
        flexGrow: 0,
        marginLeft: 30,
        marginRight: 30,
        height: hp(150),
    },
    scrollViewContent: {
        justifyContent: "center",
        alignItems: "center",
    },
});

export default App;

// import React, { useState, useRef, useEffect } from 'react';
// import { View, Text, StyleSheet, ScrollView } from 'react-native';
// import Player from '../componentes/Player';
// import Tablature from '../componentes/Tablature';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

// const sampleTablature = [
//     // ... (tu tablatura aquí)
//     { string: 1, fret: null, time: 0.1 },
//     { string: 2, fret: null, time: 0.1 },
//     { string: 3, fret: 2, time: 0.1 },
//     { string: 4, fret: 2, time: 0.1 },
//     { string: 5, fret: 0, time: 0.1 },
//     { string: 6, fret: null, time: 0.1 },

//     { string: 1, fret: null, time: 0.5 },
//     { string: 2, fret: null, time: 0.5 },
//     { string: 3, fret: 0, time: 0.5 },
//     { string: 4, fret: 0, time: 0.5 },
//     { string: 5, fret: 0, time: 0.5 },
//     { string: 6, fret: null, time: 0.5 },

//     { string: 1, fret: null, time: 1 },
//     { string: 2, fret: null, time: 1 },
//     { string: 3, fret: null, time: 1 },
//     { string: 4, fret: 2, time: 1 },
//     { string: 5, fret: 2, time: 1 },
//     { string: 6, fret: 0, time: 1},

//     { string: 1, fret: null, time: 1.5 },
//     { string: 2, fret: null, time: 1.5 },
//     { string: 3, fret: null, time: 1.5  },
//     { string: 4, fret: 2, time: 1.5  },
//     { string: 5, fret: 2, time: 1.5  },
//     { string: 6, fret: 0, time: 1.5  },

//     { string: 1, fret: null, time: 2},
//     { string: 2, fret: null, time: 2 },
//     { string: 3, fret: null, time: 2 },
//     { string: 4, fret: 0, time: 2 },
//     { string: 5, fret: 0, time: 2 },
//     { string: 6, fret: 0, time: 2},

//     { string: 1, fret: null, time: 2.5 },
//     { string: 2, fret: null, time: 2.5 },
//     { string: 3, fret: 2, time: 2.5 },
//     { string: 4, fret: 2, time: 2.5 },
//     { string: 5, fret: 0, time: 2.5 },
//     { string: 6, fret: null, time: 2.5 },

//     { string: 1, fret: null, time: 3 },
//     { string: 2, fret: null, time: 3 },
//     { string: 3, fret: 2, time: 3 },
//     { string: 4, fret: 2, time: 3 },
//     { string: 5, fret: 0, time: 3 },
//     { string: 6, fret: null, time: 3 },

//     { string: 1, fret: null, time: 3.5 },
//     { string: 2, fret: null, time: 3.5 },
//     { string: 3, fret: 0, time: 3.5 },
//     { string: 4, fret: 0, time: 3.5 },
//     { string: 5, fret: 0, time: 3.5 },
//     { string: 6, fret: null, time: 3.5 },

//     { string: 1, fret: null, time: 4 },
//     { string: 2, fret: 3, time: 4 },
//     { string: 3, fret: 2, time: 4 },
//     { string: 4, fret: 0, time: 4 },
//     { string: 5, fret: null, time: 4 },
//     { string: 6, fret: null, time: 4 },

//     { string: 1, fret: null, time: 4.5 },
//     { string: 2, fret: 3, time: 4.5 },
//     { string: 3, fret: 2, time: 4.5 },
//     { string: 4, fret: 0, time: 4.5 },
//     { string: 5, fret: null, time: 4.5 },
//     { string: 6, fret: null, time: 4.5 },

//     { string: 1, fret: null, time: 5 },
//     { string: 2, fret: 0, time: 5 },
//     { string: 3, fret: 0, time: 5 },
//     { string: 4, fret: 0, time: 5 },
//     { string: 5, fret: null, time: 5 },
//     { string: 6, fret: null, time: 5 },

//     { string: 1, fret: null, time: 5.5 },
//     { string: 2, fret: null, time: 5.5 },
//     { string: 3, fret: 2, time: 5.5 },
//     { string: 4, fret: 2, time: 5.5 },
//     { string: 5, fret: 0, time: 5.5 },
//     { string: 6, fret: null, time: 5.5 },

//     { string: 1, fret: null, time: 5.5 },
//     { string: 2, fret: null, time: 5.5 },
//     { string: 3, fret: 2, time: 5.5 },
//     { string: 4, fret: 2, time: 5.5 },
//     { string: 5, fret: 0, time: 5.5 },
//     { string: 6, fret: null, time: 5.5 },

//     { string: 1, fret: null, time: 5.5 },
//     { string: 2, fret: null, time: 5.5 },
//     { string: 3, fret: 0, time: 5.5 },
//     { string: 4, fret: 0, time: 5.5 },
//     { string: 5, fret: 0, time: 5.5 },
//     { string: 6, fret: null, time: 5.5 },

//     { string: 1, fret: null, time: 6 },
//     { string: 2, fret: null, time: 6 },
//     { string: 3, fret: null, time: 6 },
//     { string: 4, fret: 2, time: 6 },
//     { string: 5, fret: 2, time: 6 },
//     { string: 6, fret: 0, time: 6},

//     { string: 1, fret: null, time: 6.6 },
//     { string: 2, fret: null, time: 6.6 },
//     { string: 3, fret: null, time: 6.6 },
//     { string: 4, fret: 2, time: 6.6 },
//     { string: 5, fret: 2, time: 6.6 },
//     { string: 6, fret: 0, time: 6.6},

//     { string: 1, fret: null, time: 7 },
//     { string: 2, fret: null, time: 7 },
//     { string: 3, fret: null, time: 7 },
//     { string: 4, fret: 0, time: 7 },
//     { string: 5, fret: 0, time: 7 },
//     { string: 6, fret: 0, time: 7},

//     { string: 1, fret: null, time: 7.5 },
//     { string: 2, fret: 3, time: 7.5 },
//     { string: 3, fret: 2, time: 7.5 },
//     { string: 4, fret: 0, time: 7.5 },
//     { string: 5, fret: null, time: 7.5 },
//     { string: 6, fret: null, time: 7.5 },

//     { string: 1, fret: null, time: 8 },
//     { string: 2, fret: 3, time: 8 },
//     { string: 3, fret: 2, time: 8 },
//     { string: 4, fret: 0, time: 8 },
//     { string: 5, fret: null, time: 8 },
//     { string: 6, fret: null, time: 8 },

//     { string: 1, fret: null, time: 8.5 },
//     { string: 2, fret: null, time: 8.5 },
//     { string: 3, fret: 0, time: 8.5 },
//     { string: 4, fret: 0, time: 8.5 },
//     { string: 5, fret: 0, time: 8.5 },
//     { string: 6, fret: null, time: 8.5 },

//     { string: 1, fret: null, time: 9 },
//     { string: 2, fret: null, time: 9 },
//     { string: 3, fret: null, time: 9 },
//     { string: 4, fret: 2, time: 9 },
//     { string: 5, fret: 2, time: 9 },
//     { string: 6, fret: 0, time: 9},

//     { string: 1, fret: null, time: 9.5 },
//     { string: 2, fret: null, time: 9.5 },
//     { string: 3, fret: null, time: 9.5 },
//     { string: 4, fret: 2, time: 9.5 },
//     { string: 5, fret: 2, time: 9.5 },
//     { string: 6, fret: 0, time: 9.5},

//     { string: 1, fret: null, time: 10 },
//     { string: 2, fret: null, time: 10 },
//     { string: 3, fret: null, time: 10 },
//     { string: 4, fret: 2, time: 10 },
//     { string: 5, fret: 2, time: 10 },
//     { string: 6, fret: 0, time: 10},

//     { string: 1, fret: null, time: 10.5 },
//     { string: 2, fret: null, time: 10.5 },
//     { string: 3, fret: null, time: 10.5 },
//     { string: 4, fret: 2, time: 10.5 },
//     { string: 5, fret: 2, time: 10.5 },
//     { string: 6, fret: 0, time: 10.5},

//     { string: 1, fret: null, time: 11 },
//     { string: 2, fret: null, time: 11 },
//     { string: 3, fret: null, time: 11 },
//     { string: 4, fret: 2, time: 11 },
//     { string: 5, fret: 2, time: 11 },
//     { string: 6, fret: 0, time: 11},
// //_______________________________________________________________

//     { string: 1, fret: null, time: 11.5 },
//     { string: 2, fret: null, time: 11.5 },
//     { string: 3, fret: 2, time: 11.5 },
//     { string: 4, fret: 2, time: 11.5 },
//     { string: 5, fret: 0, time: 11.5 },
//     { string: 6, fret: null, time: 11.5 },

//     { string: 1, fret: null, time: 12 },
//     { string: 2, fret: null, time: 12 },
//     { string: 3, fret: 0, time: 12 },
//     { string: 4, fret: 0, time: 12 },
//     { string: 5, fret: 0, time: 12 },
//     { string: 6, fret: null, time: 12 },

//     { string: 1, fret: null, time: 12.5 },
//     { string: 2, fret: null, time: 12.5 },
//     { string: 3, fret: null, time: 12.5 },
//     { string: 4, fret: 2, time: 12.5 },
//     { string: 5, fret: 2, time: 12.5 },
//     { string: 6, fret: 0, time: 12.5},

//     { string: 1, fret: null, time: 13 },
//     { string: 2, fret: null, time: 13 },
//     { string: 3, fret: null, time: 13  },
//     { string: 4, fret: 2, time: 13  },
//     { string: 5, fret: 2, time: 13  },
//     { string: 6, fret: 0, time: 13  },

//     { string: 1, fret: null, time: 13.5},
//     { string: 2, fret: null, time: 13.5 },
//     { string: 3, fret: null, time: 13.5 },
//     { string: 4, fret: 0, time: 13.5 },
//     { string: 5, fret: 0, time: 13.5 },
//     { string: 6, fret: 0, time: 13.5},

//     { string: 1, fret: null, time: 14 },
//     { string: 2, fret: null, time: 14 },
//     { string: 3, fret: 2, time: 14 },
//     { string: 4, fret: 2, time: 14 },
//     { string: 5, fret: 0, time: 14 },
//     { string: 6, fret: null, time: 14 },

//     { string: 1, fret: null, time: 14.5 },
//     { string: 2, fret: null, time: 14.5 },
//     { string: 3, fret: 2, time: 14.5 },
//     { string: 4, fret: 2, time: 14.5 },
//     { string: 5, fret: 0, time: 14.5 },
//     { string: 6, fret: null, time: 14.5 },

//     { string: 1, fret: null, time: 15 },
//     { string: 2, fret: null, time: 15 },
//     { string: 3, fret: 0, time: 15 },
//     { string: 4, fret: 0, time: 15 },
//     { string: 5, fret: 0, time: 15 },
//     { string: 6, fret: null, time: 15 },

//     { string: 1, fret: null, time: 15.5 },
//     { string: 2, fret: 3, time: 15.5 },
//     { string: 3, fret: 2, time: 15.5 },
//     { string: 4, fret: 0, time: 15.5 },
//     { string: 5, fret: null, time: 15.5 },
//     { string: 6, fret: null, time: 15.5 },

//     { string: 1, fret: null, time: 16 },
//     { string: 2, fret: 3, time: 16 },
//     { string: 3, fret: 2, time: 16 },
//     { string: 4, fret: 0, time: 16 },
//     { string: 5, fret: null, time: 16 },
//     { string: 6, fret: null, time: 16 },

//     { string: 1, fret: null, time: 16.5 },
//     { string: 2, fret: 0, time: 16.5 },
//     { string: 3, fret: 0, time: 16.5 },
//     { string: 4, fret: 0, time: 16.5 },
//     { string: 5, fret: null, time: 16.5 },
//     { string: 6, fret: null, time: 16.5 },

//     { string: 1, fret: null, time: 17 },
//     { string: 2, fret: null, time: 17 },
//     { string: 3, fret: 2, time: 17 },
//     { string: 4, fret: 2, time: 17 },
//     { string: 5, fret: 0, time: 17 },
//     { string: 6, fret: null, time: 17 },

//     { string: 1, fret: null, time: 17.5 },
//     { string: 2, fret: null, time: 17.5 },
//     { string: 3, fret: 2, time: 17.5 },
//     { string: 4, fret: 2, time: 17.5 },
//     { string: 5, fret: 0, time: 17.5 },
//     { string: 6, fret: null, time: 17.5 },

//     { string: 1, fret: null, time: 18 },
//     { string: 2, fret: null, time: 18 },
//     { string: 3, fret: 0, time: 18 },
//     { string: 4, fret: 0, time: 18 },
//     { string: 5, fret: 0, time: 18 },
//     { string: 6, fret: null, time: 18 },

//     { string: 1, fret: null, time: 18.5 },
//     { string: 2, fret: null, time: 18.5 },
//     { string: 3, fret: null, time: 18.5 },
//     { string: 4, fret: 2, time: 18.5 },
//     { string: 5, fret: 2, time: 18.5 },
//     { string: 6, fret: 0, time: 18.5},

//     { string: 1, fret: null, time: 19 },
//     { string: 2, fret: null, time: 19 },
//     { string: 3, fret: null, time: 19 },
//     { string: 4, fret: 2, time: 19 },
//     { string: 5, fret: 2, time: 19 },
//     { string: 6, fret: 0, time: 19},

//     { string: 1, fret: null, time: 19.5 },
//     { string: 2, fret: null, time: 19.5 },
//     { string: 3, fret: null, time: 19.5 },
//     { string: 4, fret: 0, time: 19.5 },
//     { string: 5, fret: 0, time: 19.5 },
//     { string: 6, fret: 0, time: 19.5},

//     { string: 1, fret: null, time: 20 },
//     { string: 2, fret: null, time: 20 },
//     { string: 3, fret: 2, time: 20 },
//     { string: 4, fret: 2, time: 20 },
//     { string: 5, fret: 0, time: 20 },
//     { string: 6, fret: null, time: 20 },

//     { string: 1, fret: null, time: 20.5 },
//     { string: 2, fret: null, time: 20.5 },
//     { string: 3, fret: 2, time: 20.5 },
//     { string: 4, fret: 2, time: 20.5 },
//     { string: 5, fret: 0, time: 20.5 },
//     { string: 6, fret: null, time: 20.5 },

//     { string: 1, fret: null, time: 21 },
//     { string: 2, fret: null, time: 21 },
//     { string: 3, fret: 2, time: 21 },
//     { string: 4, fret: 0, time: 21 },
//     { string: 5, fret: 0, time: 21 },
//     { string: 6, fret: null, time: 21 },

//     { string: 1, fret: null, time: 21.5 },
//     { string: 2, fret: null, time: 21.5 },
//     { string: 3, fret: 2, time: 21.5 },
//     { string: 4, fret: 2, time: 21.5 },
//     { string: 5, fret: 0, time: 21.5 },
//     { string: 6, fret: null, time: 21.5},

//     { string: 1, fret: null, time: 22 },
//     { string: 2, fret: null, time: 22 },
//     { string: 3, fret: 2, time: 22 },
//     { string: 4, fret: 2, time: 22 },
//     { string: 5, fret: 0, time: 22 },
//     { string: 6, fret: null, time: 22},

//     { string: 1, fret: null, time: 22.5 },
//     { string: 2, fret: null, time: 22.5 },
//     { string: 3, fret: 2, time: 22.5 },
//     { string: 4, fret: 2, time: 22.5 },
//     { string: 5, fret: 0, time: 22.5 },
//     { string: 6, fret: null, time: 22.5},

//     { string: 1, fret: null, time: 23 },
//     { string: 2, fret: null, time: 23 },
//     { string: 3, fret: 2, time: 23 },
//     { string: 4, fret: 2, time: 23 },
//     { string: 5, fret: 0, time: 23 },
//     { string: 6, fret: null, time: 23},

//     { string: 1, fret: null, time: 23.5 },
//     { string: 2, fret: null, time: 23.5 },
//     { string: 3, fret: 2, time: 23.5 },
//     { string: 4, fret: 2, time: 23.5 },
//     { string: 5, fret: 0, time: 23.5 },
//     { string: 6, fret: null, time: 23.5},

//     { string: 1, fret: null, time: 24 },
//     { string: 2, fret: null, time: 24 },
//     { string: 3, fret: 2, time: 24 },
//     { string: 4, fret: 2, time: 24 },
//     { string: 5, fret: 0, time: 24 },
//     { string: 6, fret: null, time: 24},
// ];

// const App = () => {
//     const [currentTime, setCurrentTime] = useState(0);
//     const scrollViewRef = useRef(null);

//     const handleTimeUpdate = (time) => {
//         setCurrentTime(time);
//     };

//     useEffect(() => {
//         const scrollToGuide = () => {
//             const guidePosition = sampleTablature.findIndex(note => currentTime < note.time);
//             if (guidePosition !== -1) {
//                 const xPosition = (guidePosition - 1) * wp(100); // Ajusta según la posición deseada
//                 scrollViewRef.current.scrollTo({ x: xPosition, animated: true });
//             }
//         };

//         scrollToGuide();
//     }, [currentTime]);

//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>Tablature Player</Text>
//             <Player audioSrc={require('./assets/AudiosRock/Green Day - The Grouch.mp3')} onTimeUpdate={handleTimeUpdate} />
//             <ScrollView
//                 ref={scrollViewRef}
//                 style={styles.scrollView}
//                 contentContainerStyle={styles.scrollViewContent}
//                 horizontal={true}
//                 showsHorizontalScrollIndicator={false}
//                 scrollEventThrottle={16}
//             >
//                 <Tablature tablature={sampleTablature} currentTime={currentTime} />
//             </ScrollView>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         padding: 20,
//     },
//     title: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginBottom: 20,
//     },
//     scrollView: {
//         flexGrow: 0,
//         marginLeft: 30,
//         marginRight: 30,
//         height: hp(150),
//     },
//     scrollViewContent: {
//         justifyContent: "center",
//         alignItems: "center",
//     },
// });

// export default App;

// import React, { useState, useRef, useEffect } from 'react';
// import { View, Text, StyleSheet, ScrollView } from 'react-native';
// import Player from '../componentes/Player';
// import Tablature from '../componentes/Tablature';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

// const sampleTablature = [
    
//     { string: 1, fret: null, time: 0.1 },
//     { string: 2, fret: null, time: 0.1 },
//     { string: 3, fret: 2, time: 0.1 },
//     { string: 4, fret: 2, time: 0.1 },
//     { string: 5, fret: 0, time: 0.1 },
//     { string: 6, fret: null, time: 0.1 },

//     { string: 1, fret: null, time: 0.5 },
//     { string: 2, fret: null, time: 0.5 },
//     { string: 3, fret: 0, time: 0.5 },
//     { string: 4, fret: 0, time: 0.5 },
//     { string: 5, fret: 0, time: 0.5 },
//     { string: 6, fret: null, time: 0.5 },

//     { string: 1, fret: null, time: 1 },
//     { string: 2, fret: null, time: 1 },
//     { string: 3, fret: null, time: 1 },
//     { string: 4, fret: 2, time: 1 },
//     { string: 5, fret: 2, time: 1 },
//     { string: 6, fret: 0, time: 1},

//     { string: 1, fret: null, time: 1.5 },
//     { string: 2, fret: null, time: 1.5 },
//     { string: 3, fret: null, time: 1.5  },
//     { string: 4, fret: 2, time: 1.5  },
//     { string: 5, fret: 2, time: 1.5  },
//     { string: 6, fret: 0, time: 1.5  },

//     { string: 1, fret: null, time: 2},
//     { string: 2, fret: null, time: 2 },
//     { string: 3, fret: null, time: 2 },
//     { string: 4, fret: 0, time: 2 },
//     { string: 5, fret: 0, time: 2 },
//     { string: 6, fret: 0, time: 2},

//     { string: 1, fret: null, time: 2.5 },
//     { string: 2, fret: null, time: 2.5 },
//     { string: 3, fret: 2, time: 2.5 },
//     { string: 4, fret: 2, time: 2.5 },
//     { string: 5, fret: 0, time: 2.5 },
//     { string: 6, fret: null, time: 2.5 },

//     { string: 1, fret: null, time: 3 },
//     { string: 2, fret: null, time: 3 },
//     { string: 3, fret: 2, time: 3 },
//     { string: 4, fret: 2, time: 3 },
//     { string: 5, fret: 0, time: 3 },
//     { string: 6, fret: null, time: 3 },

//     { string: 1, fret: null, time: 3.5 },
//     { string: 2, fret: null, time: 3.5 },
//     { string: 3, fret: 0, time: 3.5 },
//     { string: 4, fret: 0, time: 3.5 },
//     { string: 5, fret: 0, time: 3.5 },
//     { string: 6, fret: null, time: 3.5 },

//     { string: 1, fret: null, time: 4 },
//     { string: 2, fret: 3, time: 4 },
//     { string: 3, fret: 2, time: 4 },
//     { string: 4, fret: 0, time: 4 },
//     { string: 5, fret: null, time: 4 },
//     { string: 6, fret: null, time: 4 },

//     { string: 1, fret: null, time: 4.5 },
//     { string: 2, fret: 3, time: 4.5 },
//     { string: 3, fret: 2, time: 4.5 },
//     { string: 4, fret: 0, time: 4.5 },
//     { string: 5, fret: null, time: 4.5 },
//     { string: 6, fret: null, time: 4.5 },

//     { string: 1, fret: null, time: 5 },
//     { string: 2, fret: 0, time: 5 },
//     { string: 3, fret: 0, time: 5 },
//     { string: 4, fret: 0, time: 5 },
//     { string: 5, fret: null, time: 5 },
//     { string: 6, fret: null, time: 5 },

//     { string: 1, fret: null, time: 5.5 },
//     { string: 2, fret: null, time: 5.5 },
//     { string: 3, fret: 2, time: 5.5 },
//     { string: 4, fret: 2, time: 5.5 },
//     { string: 5, fret: 0, time: 5.5 },
//     { string: 6, fret: null, time: 5.5 },

//     { string: 1, fret: null, time: 5.5 },
//     { string: 2, fret: null, time: 5.5 },
//     { string: 3, fret: 2, time: 5.5 },
//     { string: 4, fret: 2, time: 5.5 },
//     { string: 5, fret: 0, time: 5.5 },
//     { string: 6, fret: null, time: 5.5 },

//     { string: 1, fret: null, time: 5.5 },
//     { string: 2, fret: null, time: 5.5 },
//     { string: 3, fret: 0, time: 5.5 },
//     { string: 4, fret: 0, time: 5.5 },
//     { string: 5, fret: 0, time: 5.5 },
//     { string: 6, fret: null, time: 5.5 },

//     { string: 1, fret: null, time: 6 },
//     { string: 2, fret: null, time: 6 },
//     { string: 3, fret: null, time: 6 },
//     { string: 4, fret: 2, time: 6 },
//     { string: 5, fret: 2, time: 6 },
//     { string: 6, fret: 0, time: 6},

//     { string: 1, fret: null, time: 6.6 },
//     { string: 2, fret: null, time: 6.6 },
//     { string: 3, fret: null, time: 6.6 },
//     { string: 4, fret: 2, time: 6.6 },
//     { string: 5, fret: 2, time: 6.6 },
//     { string: 6, fret: 0, time: 6.6},

//     { string: 1, fret: null, time: 7 },
//     { string: 2, fret: null, time: 7 },
//     { string: 3, fret: null, time: 7 },
//     { string: 4, fret: 0, time: 7 },
//     { string: 5, fret: 0, time: 7 },
//     { string: 6, fret: 0, time: 7},

//     { string: 1, fret: null, time: 7.5 },
//     { string: 2, fret: 3, time: 7.5 },
//     { string: 3, fret: 2, time: 7.5 },
//     { string: 4, fret: 0, time: 7.5 },
//     { string: 5, fret: null, time: 7.5 },
//     { string: 6, fret: null, time: 7.5 },

//     { string: 1, fret: null, time: 8 },
//     { string: 2, fret: 3, time: 8 },
//     { string: 3, fret: 2, time: 8 },
//     { string: 4, fret: 0, time: 8 },
//     { string: 5, fret: null, time: 8 },
//     { string: 6, fret: null, time: 8 },

//     { string: 1, fret: null, time: 8.5 },
//     { string: 2, fret: null, time: 8.5 },
//     { string: 3, fret: 0, time: 8.5 },
//     { string: 4, fret: 0, time: 8.5 },
//     { string: 5, fret: 0, time: 8.5 },
//     { string: 6, fret: null, time: 8.5 },

//     { string: 1, fret: null, time: 9 },
//     { string: 2, fret: null, time: 9 },
//     { string: 3, fret: null, time: 9 },
//     { string: 4, fret: 2, time: 9 },
//     { string: 5, fret: 2, time: 9 },
//     { string: 6, fret: 0, time: 9},

//     { string: 1, fret: null, time: 9.5 },
//     { string: 2, fret: null, time: 9.5 },
//     { string: 3, fret: null, time: 9.5 },
//     { string: 4, fret: 2, time: 9.5 },
//     { string: 5, fret: 2, time: 9.5 },
//     { string: 6, fret: 0, time: 9.5},

//     { string: 1, fret: null, time: 10 },
//     { string: 2, fret: null, time: 10 },
//     { string: 3, fret: null, time: 10 },
//     { string: 4, fret: 2, time: 10 },
//     { string: 5, fret: 2, time: 10 },
//     { string: 6, fret: 0, time: 10},

//     { string: 1, fret: null, time: 10.5 },
//     { string: 2, fret: null, time: 10.5 },
//     { string: 3, fret: null, time: 10.5 },
//     { string: 4, fret: 2, time: 10.5 },
//     { string: 5, fret: 2, time: 10.5 },
//     { string: 6, fret: 0, time: 10.5},

//     { string: 1, fret: null, time: 11 },
//     { string: 2, fret: null, time: 11 },
//     { string: 3, fret: null, time: 11 },
//     { string: 4, fret: 2, time: 11 },
//     { string: 5, fret: 2, time: 11 },
//     { string: 6, fret: 0, time: 11},
// //_______________________________________________________________

//     { string: 1, fret: null, time: 11.5 },
//     { string: 2, fret: null, time: 11.5 },
//     { string: 3, fret: 2, time: 11.5 },
//     { string: 4, fret: 2, time: 11.5 },
//     { string: 5, fret: 0, time: 11.5 },
//     { string: 6, fret: null, time: 11.5 },

//     { string: 1, fret: null, time: 12 },
//     { string: 2, fret: null, time: 12 },
//     { string: 3, fret: 0, time: 12 },
//     { string: 4, fret: 0, time: 12 },
//     { string: 5, fret: 0, time: 12 },
//     { string: 6, fret: null, time: 12 },

//     { string: 1, fret: null, time: 12.5 },
//     { string: 2, fret: null, time: 12.5 },
//     { string: 3, fret: null, time: 12.5 },
//     { string: 4, fret: 2, time: 12.5 },
//     { string: 5, fret: 2, time: 12.5 },
//     { string: 6, fret: 0, time: 12.5},

//     { string: 1, fret: null, time: 13 },
//     { string: 2, fret: null, time: 13 },
//     { string: 3, fret: null, time: 13  },
//     { string: 4, fret: 2, time: 13  },
//     { string: 5, fret: 2, time: 13  },
//     { string: 6, fret: 0, time: 13  },

//     { string: 1, fret: null, time: 13.5},
//     { string: 2, fret: null, time: 13.5 },
//     { string: 3, fret: null, time: 13.5 },
//     { string: 4, fret: 0, time: 13.5 },
//     { string: 5, fret: 0, time: 13.5 },
//     { string: 6, fret: 0, time: 13.5},

//     { string: 1, fret: null, time: 14 },
//     { string: 2, fret: null, time: 14 },
//     { string: 3, fret: 2, time: 14 },
//     { string: 4, fret: 2, time: 14 },
//     { string: 5, fret: 0, time: 14 },
//     { string: 6, fret: null, time: 14 },

//     { string: 1, fret: null, time: 14.5 },
//     { string: 2, fret: null, time: 14.5 },
//     { string: 3, fret: 2, time: 14.5 },
//     { string: 4, fret: 2, time: 14.5 },
//     { string: 5, fret: 0, time: 14.5 },
//     { string: 6, fret: null, time: 14.5 },

//     { string: 1, fret: null, time: 15 },
//     { string: 2, fret: null, time: 15 },
//     { string: 3, fret: 0, time: 15 },
//     { string: 4, fret: 0, time: 15 },
//     { string: 5, fret: 0, time: 15 },
//     { string: 6, fret: null, time: 15 },

//     { string: 1, fret: null, time: 15.5 },
//     { string: 2, fret: 3, time: 15.5 },
//     { string: 3, fret: 2, time: 15.5 },
//     { string: 4, fret: 0, time: 15.5 },
//     { string: 5, fret: null, time: 15.5 },
//     { string: 6, fret: null, time: 15.5 },

//     { string: 1, fret: null, time: 16 },
//     { string: 2, fret: 3, time: 16 },
//     { string: 3, fret: 2, time: 16 },
//     { string: 4, fret: 0, time: 16 },
//     { string: 5, fret: null, time: 16 },
//     { string: 6, fret: null, time: 16 },

//     { string: 1, fret: null, time: 16.5 },
//     { string: 2, fret: 0, time: 16.5 },
//     { string: 3, fret: 0, time: 16.5 },
//     { string: 4, fret: 0, time: 16.5 },
//     { string: 5, fret: null, time: 16.5 },
//     { string: 6, fret: null, time: 16.5 },

//     { string: 1, fret: null, time: 17 },
//     { string: 2, fret: null, time: 17 },
//     { string: 3, fret: 2, time: 17 },
//     { string: 4, fret: 2, time: 17 },
//     { string: 5, fret: 0, time: 17 },
//     { string: 6, fret: null, time: 17 },

//     { string: 1, fret: null, time: 17.5 },
//     { string: 2, fret: null, time: 17.5 },
//     { string: 3, fret: 2, time: 17.5 },
//     { string: 4, fret: 2, time: 17.5 },
//     { string: 5, fret: 0, time: 17.5 },
//     { string: 6, fret: null, time: 17.5 },

//     { string: 1, fret: null, time: 18 },
//     { string: 2, fret: null, time: 18 },
//     { string: 3, fret: 0, time: 18 },
//     { string: 4, fret: 0, time: 18 },
//     { string: 5, fret: 0, time: 18 },
//     { string: 6, fret: null, time: 18 },

//     { string: 1, fret: null, time: 18.5 },
//     { string: 2, fret: null, time: 18.5 },
//     { string: 3, fret: null, time: 18.5 },
//     { string: 4, fret: 2, time: 18.5 },
//     { string: 5, fret: 2, time: 18.5 },
//     { string: 6, fret: 0, time: 18.5},

//     { string: 1, fret: null, time: 19 },
//     { string: 2, fret: null, time: 19 },
//     { string: 3, fret: null, time: 19 },
//     { string: 4, fret: 2, time: 19 },
//     { string: 5, fret: 2, time: 19 },
//     { string: 6, fret: 0, time: 19},

//     { string: 1, fret: null, time: 19.5 },
//     { string: 2, fret: null, time: 19.5 },
//     { string: 3, fret: null, time: 19.5 },
//     { string: 4, fret: 0, time: 19.5 },
//     { string: 5, fret: 0, time: 19.5 },
//     { string: 6, fret: 0, time: 19.5},

//     { string: 1, fret: null, time: 20 },
//     { string: 2, fret: null, time: 20 },
//     { string: 3, fret: 2, time: 20 },
//     { string: 4, fret: 2, time: 20 },
//     { string: 5, fret: 0, time: 20 },
//     { string: 6, fret: null, time: 20 },

//     { string: 1, fret: null, time: 20.5 },
//     { string: 2, fret: null, time: 20.5 },
//     { string: 3, fret: 2, time: 20.5 },
//     { string: 4, fret: 2, time: 20.5 },
//     { string: 5, fret: 0, time: 20.5 },
//     { string: 6, fret: null, time: 20.5 },

//     { string: 1, fret: null, time: 21 },
//     { string: 2, fret: null, time: 21 },
//     { string: 3, fret: 2, time: 21 },
//     { string: 4, fret: 0, time: 21 },
//     { string: 5, fret: 0, time: 21 },
//     { string: 6, fret: null, time: 21 },

//     { string: 1, fret: null, time: 21.5 },
//     { string: 2, fret: null, time: 21.5 },
//     { string: 3, fret: 2, time: 21.5 },
//     { string: 4, fret: 2, time: 21.5 },
//     { string: 5, fret: 0, time: 21.5 },
//     { string: 6, fret: null, time: 21.5},

//     { string: 1, fret: null, time: 22 },
//     { string: 2, fret: null, time: 22 },
//     { string: 3, fret: 2, time: 22 },
//     { string: 4, fret: 2, time: 22 },
//     { string: 5, fret: 0, time: 22 },
//     { string: 6, fret: null, time: 22},

//     { string: 1, fret: null, time: 22.5 },
//     { string: 2, fret: null, time: 22.5 },
//     { string: 3, fret: 2, time: 22.5 },
//     { string: 4, fret: 2, time: 22.5 },
//     { string: 5, fret: 0, time: 22.5 },
//     { string: 6, fret: null, time: 22.5},

//     { string: 1, fret: null, time: 23 },
//     { string: 2, fret: null, time: 23 },
//     { string: 3, fret: 2, time: 23 },
//     { string: 4, fret: 2, time: 23 },
//     { string: 5, fret: 0, time: 23 },
//     { string: 6, fret: null, time: 23},

//     { string: 1, fret: null, time: 23.5 },
//     { string: 2, fret: null, time: 23.5 },
//     { string: 3, fret: 2, time: 23.5 },
//     { string: 4, fret: 2, time: 23.5 },
//     { string: 5, fret: 0, time: 23.5 },
//     { string: 6, fret: null, time: 23.5},

//     { string: 1, fret: null, time: 24 },
//     { string: 2, fret: null, time: 24 },
//     { string: 3, fret: 2, time: 24 },
//     { string: 4, fret: 2, time: 24 },
//     { string: 5, fret: 0, time: 24 },
//     { string: 6, fret: null, time: 24},
// ];

// const App = () => {
//     const [currentTime, setCurrentTime] = useState(0);
//     const scrollViewRef = useRef(null);

//     const handleTimeUpdate = (time) => {
//         setCurrentTime(time);
//     };

//     useEffect(() => {
//         const scrollToGuide = () => {
//             const guidePosition = sampleTablature.findIndex(note => currentTime >= note.time);
//             if (guidePosition !== -1) {
//                 const xPosition = guidePosition * wp(100);
//                 scrollViewRef.current.scrollTo({ x: xPosition, animated: true });
//             }
//         };
    
//         scrollToGuide();
//     }, [currentTime]);

//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>Tablature Player</Text>
//             <Player audioSrc={require('./assets/AudiosRock/Green Day - The Grouch.mp3')} onTimeUpdate={handleTimeUpdate} />
//             <ScrollView
//                 ref={scrollViewRef}
//                 style={styles.scrollView}
//                 contentContainerStyle={styles.scrollViewContent}
//                 horizontal={true}
//                 showsHorizontalScrollIndicator={false}
//             >
//                 <Tablature tablature={sampleTablature} currentTime={currentTime} />
//             </ScrollView>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         padding: 20,
//     },
//     title: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginBottom: 20,
//     },
//     scrollView: {
//         flexGrow: 0,
//         marginLeft: 30,
//         marginRight: 30,
//         height: hp(150),
//     },
//     scrollViewContent: {
//         justifyContent: "center",
//         alignItems: "center",
//     },
// });

// export default App;

// // src/App.js
// import React, { useState } from 'react';
// import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
// import Player from '../componentes/Player';
// import Tablature from '../componentes/Tablature';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

// const sampleTablature = [
//     { string: 1, fret: null, time: 0.1 },
//     { string: 2, fret: null, time: 0.1 },
//     { string: 3, fret: 2, time: 0.1 },
//     { string: 4, fret: 2, time: 0.1 },
//     { string: 5, fret: 0, time: 0.1 },
//     { string: 6, fret: null, time: 0.1 },

//     { string: 1, fret: null, time: 0.5 },
//     { string: 2, fret: null, time: 0.5 },
//     { string: 3, fret: 0, time: 0.5 },
//     { string: 4, fret: 0, time: 0.5 },
//     { string: 5, fret: 0, time: 0.5 },
//     { string: 6, fret: null, time: 0.5 },

//     { string: 1, fret: null, time: 1 },
//     { string: 2, fret: null, time: 1 },
//     { string: 3, fret: null, time: 1 },
//     { string: 4, fret: 2, time: 1 },
//     { string: 5, fret: 2, time: 1 },
//     { string: 6, fret: 0, time: 1},

//     { string: 1, fret: null, time: 1.5 },
//     { string: 2, fret: null, time: 1.5 },
//     { string: 3, fret: null, time: 1.5  },
//     { string: 4, fret: 2, time: 1.5  },
//     { string: 5, fret: 2, time: 1.5  },
//     { string: 6, fret: 0, time: 1.5  },

//     { string: 1, fret: null, time: 2},
//     { string: 2, fret: null, time: 2 },
//     { string: 3, fret: null, time: 2 },
//     { string: 4, fret: 0, time: 2 },
//     { string: 5, fret: 0, time: 2 },
//     { string: 6, fret: 0, time: 2},

//     { string: 1, fret: null, time: 2.5 },
//     { string: 2, fret: null, time: 2.5 },
//     { string: 3, fret: 2, time: 2.5 },
//     { string: 4, fret: 2, time: 2.5 },
//     { string: 5, fret: 0, time: 2.5 },
//     { string: 6, fret: null, time: 2.5 },

//     { string: 1, fret: null, time: 3 },
//     { string: 2, fret: null, time: 3 },
//     { string: 3, fret: 2, time: 3 },
//     { string: 4, fret: 2, time: 3 },
//     { string: 5, fret: 0, time: 3 },
//     { string: 6, fret: null, time: 3 },

//     { string: 1, fret: null, time: 3.5 },
//     { string: 2, fret: null, time: 3.5 },
//     { string: 3, fret: 0, time: 3.5 },
//     { string: 4, fret: 0, time: 3.5 },
//     { string: 5, fret: 0, time: 3.5 },
//     { string: 6, fret: null, time: 3.5 },

//     { string: 1, fret: null, time: 4 },
//     { string: 2, fret: 3, time: 4 },
//     { string: 3, fret: 2, time: 4 },
//     { string: 4, fret: 0, time: 4 },
//     { string: 5, fret: null, time: 4 },
//     { string: 6, fret: null, time: 4 },

//     { string: 1, fret: null, time: 4.5 },
//     { string: 2, fret: 3, time: 4.5 },
//     { string: 3, fret: 2, time: 4.5 },
//     { string: 4, fret: 0, time: 4.5 },
//     { string: 5, fret: null, time: 4.5 },
//     { string: 6, fret: null, time: 4.5 },

//     { string: 1, fret: null, time: 5 },
//     { string: 2, fret: 0, time: 5 },
//     { string: 3, fret: 0, time: 5 },
//     { string: 4, fret: 0, time: 5 },
//     { string: 5, fret: null, time: 5 },
//     { string: 6, fret: null, time: 5 },

//     { string: 1, fret: null, time: 5.5 },
//     { string: 2, fret: null, time: 5.5 },
//     { string: 3, fret: 2, time: 5.5 },
//     { string: 4, fret: 2, time: 5.5 },
//     { string: 5, fret: 0, time: 5.5 },
//     { string: 6, fret: null, time: 5.5 },

//     { string: 1, fret: null, time: 5.5 },
//     { string: 2, fret: null, time: 5.5 },
//     { string: 3, fret: 2, time: 5.5 },
//     { string: 4, fret: 2, time: 5.5 },
//     { string: 5, fret: 0, time: 5.5 },
//     { string: 6, fret: null, time: 5.5 },

//     { string: 1, fret: null, time: 5.5 },
//     { string: 2, fret: null, time: 5.5 },
//     { string: 3, fret: 0, time: 5.5 },
//     { string: 4, fret: 0, time: 5.5 },
//     { string: 5, fret: 0, time: 5.5 },
//     { string: 6, fret: null, time: 5.5 },

//     { string: 1, fret: null, time: 6 },
//     { string: 2, fret: null, time: 6 },
//     { string: 3, fret: null, time: 6 },
//     { string: 4, fret: 2, time: 6 },
//     { string: 5, fret: 2, time: 6 },
//     { string: 6, fret: 0, time: 6},

//     { string: 1, fret: null, time: 6.6 },
//     { string: 2, fret: null, time: 6.6 },
//     { string: 3, fret: null, time: 6.6 },
//     { string: 4, fret: 2, time: 6.6 },
//     { string: 5, fret: 2, time: 6.6 },
//     { string: 6, fret: 0, time: 6.6},

//     { string: 1, fret: null, time: 7 },
//     { string: 2, fret: null, time: 7 },
//     { string: 3, fret: null, time: 7 },
//     { string: 4, fret: 0, time: 7 },
//     { string: 5, fret: 0, time: 7 },
//     { string: 6, fret: 0, time: 7},

//     { string: 1, fret: null, time: 7.5 },
//     { string: 2, fret: 3, time: 7.5 },
//     { string: 3, fret: 2, time: 7.5 },
//     { string: 4, fret: 0, time: 7.5 },
//     { string: 5, fret: null, time: 7.5 },
//     { string: 6, fret: null, time: 7.5 },

//     { string: 1, fret: null, time: 8 },
//     { string: 2, fret: 3, time: 8 },
//     { string: 3, fret: 2, time: 8 },
//     { string: 4, fret: 0, time: 8 },
//     { string: 5, fret: null, time: 8 },
//     { string: 6, fret: null, time: 8 },

//     { string: 1, fret: null, time: 8.5 },
//     { string: 2, fret: null, time: 8.5 },
//     { string: 3, fret: 0, time: 8.5 },
//     { string: 4, fret: 0, time: 8.5 },
//     { string: 5, fret: 0, time: 8.5 },
//     { string: 6, fret: null, time: 8.5 },

//     { string: 1, fret: null, time: 9 },
//     { string: 2, fret: null, time: 9 },
//     { string: 3, fret: null, time: 9 },
//     { string: 4, fret: 2, time: 9 },
//     { string: 5, fret: 2, time: 9 },
//     { string: 6, fret: 0, time: 9},

//     { string: 1, fret: null, time: 9.5 },
//     { string: 2, fret: null, time: 9.5 },
//     { string: 3, fret: null, time: 9.5 },
//     { string: 4, fret: 2, time: 9.5 },
//     { string: 5, fret: 2, time: 9.5 },
//     { string: 6, fret: 0, time: 9.5},

//     { string: 1, fret: null, time: 10 },
//     { string: 2, fret: null, time: 10 },
//     { string: 3, fret: null, time: 10 },
//     { string: 4, fret: 2, time: 10 },
//     { string: 5, fret: 2, time: 10 },
//     { string: 6, fret: 0, time: 10},

//     { string: 1, fret: null, time: 10.5 },
//     { string: 2, fret: null, time: 10.5 },
//     { string: 3, fret: null, time: 10.5 },
//     { string: 4, fret: 2, time: 10.5 },
//     { string: 5, fret: 2, time: 10.5 },
//     { string: 6, fret: 0, time: 10.5},

//     { string: 1, fret: null, time: 11 },
//     { string: 2, fret: null, time: 11 },
//     { string: 3, fret: null, time: 11 },
//     { string: 4, fret: 2, time: 11 },
//     { string: 5, fret: 2, time: 11 },
//     { string: 6, fret: 0, time: 11},
// //_______________________________________________________________

//     { string: 1, fret: null, time: 11.5 },
//     { string: 2, fret: null, time: 11.5 },
//     { string: 3, fret: 2, time: 11.5 },
//     { string: 4, fret: 2, time: 11.5 },
//     { string: 5, fret: 0, time: 11.5 },
//     { string: 6, fret: null, time: 11.5 },

//     { string: 1, fret: null, time: 12 },
//     { string: 2, fret: null, time: 12 },
//     { string: 3, fret: 0, time: 12 },
//     { string: 4, fret: 0, time: 12 },
//     { string: 5, fret: 0, time: 12 },
//     { string: 6, fret: null, time: 12 },

//     { string: 1, fret: null, time: 12.5 },
//     { string: 2, fret: null, time: 12.5 },
//     { string: 3, fret: null, time: 12.5 },
//     { string: 4, fret: 2, time: 12.5 },
//     { string: 5, fret: 2, time: 12.5 },
//     { string: 6, fret: 0, time: 12.5},

//     { string: 1, fret: null, time: 13 },
//     { string: 2, fret: null, time: 13 },
//     { string: 3, fret: null, time: 13  },
//     { string: 4, fret: 2, time: 13  },
//     { string: 5, fret: 2, time: 13  },
//     { string: 6, fret: 0, time: 13  },

//     { string: 1, fret: null, time: 13.5},
//     { string: 2, fret: null, time: 13.5 },
//     { string: 3, fret: null, time: 13.5 },
//     { string: 4, fret: 0, time: 13.5 },
//     { string: 5, fret: 0, time: 13.5 },
//     { string: 6, fret: 0, time: 13.5},

//     { string: 1, fret: null, time: 14 },
//     { string: 2, fret: null, time: 14 },
//     { string: 3, fret: 2, time: 14 },
//     { string: 4, fret: 2, time: 14 },
//     { string: 5, fret: 0, time: 14 },
//     { string: 6, fret: null, time: 14 },

//     { string: 1, fret: null, time: 14.5 },
//     { string: 2, fret: null, time: 14.5 },
//     { string: 3, fret: 2, time: 14.5 },
//     { string: 4, fret: 2, time: 14.5 },
//     { string: 5, fret: 0, time: 14.5 },
//     { string: 6, fret: null, time: 14.5 },

//     { string: 1, fret: null, time: 15 },
//     { string: 2, fret: null, time: 15 },
//     { string: 3, fret: 0, time: 15 },
//     { string: 4, fret: 0, time: 15 },
//     { string: 5, fret: 0, time: 15 },
//     { string: 6, fret: null, time: 15 },

//     { string: 1, fret: null, time: 15.5 },
//     { string: 2, fret: 3, time: 15.5 },
//     { string: 3, fret: 2, time: 15.5 },
//     { string: 4, fret: 0, time: 15.5 },
//     { string: 5, fret: null, time: 15.5 },
//     { string: 6, fret: null, time: 15.5 },

//     { string: 1, fret: null, time: 16 },
//     { string: 2, fret: 3, time: 16 },
//     { string: 3, fret: 2, time: 16 },
//     { string: 4, fret: 0, time: 16 },
//     { string: 5, fret: null, time: 16 },
//     { string: 6, fret: null, time: 16 },

//     { string: 1, fret: null, time: 16.5 },
//     { string: 2, fret: 0, time: 16.5 },
//     { string: 3, fret: 0, time: 16.5 },
//     { string: 4, fret: 0, time: 16.5 },
//     { string: 5, fret: null, time: 16.5 },
//     { string: 6, fret: null, time: 16.5 },

//     { string: 1, fret: null, time: 17 },
//     { string: 2, fret: null, time: 17 },
//     { string: 3, fret: 2, time: 17 },
//     { string: 4, fret: 2, time: 17 },
//     { string: 5, fret: 0, time: 17 },
//     { string: 6, fret: null, time: 17 },

//     { string: 1, fret: null, time: 17.5 },
//     { string: 2, fret: null, time: 17.5 },
//     { string: 3, fret: 2, time: 17.5 },
//     { string: 4, fret: 2, time: 17.5 },
//     { string: 5, fret: 0, time: 17.5 },
//     { string: 6, fret: null, time: 17.5 },

//     { string: 1, fret: null, time: 18 },
//     { string: 2, fret: null, time: 18 },
//     { string: 3, fret: 0, time: 18 },
//     { string: 4, fret: 0, time: 18 },
//     { string: 5, fret: 0, time: 18 },
//     { string: 6, fret: null, time: 18 },

//     { string: 1, fret: null, time: 18.5 },
//     { string: 2, fret: null, time: 18.5 },
//     { string: 3, fret: null, time: 18.5 },
//     { string: 4, fret: 2, time: 18.5 },
//     { string: 5, fret: 2, time: 18.5 },
//     { string: 6, fret: 0, time: 18.5},

//     { string: 1, fret: null, time: 19 },
//     { string: 2, fret: null, time: 19 },
//     { string: 3, fret: null, time: 19 },
//     { string: 4, fret: 2, time: 19 },
//     { string: 5, fret: 2, time: 19 },
//     { string: 6, fret: 0, time: 19},

//     { string: 1, fret: null, time: 19.5 },
//     { string: 2, fret: null, time: 19.5 },
//     { string: 3, fret: null, time: 19.5 },
//     { string: 4, fret: 0, time: 19.5 },
//     { string: 5, fret: 0, time: 19.5 },
//     { string: 6, fret: 0, time: 19.5},

//     { string: 1, fret: null, time: 20 },
//     { string: 2, fret: null, time: 20 },
//     { string: 3, fret: 2, time: 20 },
//     { string: 4, fret: 2, time: 20 },
//     { string: 5, fret: 0, time: 20 },
//     { string: 6, fret: null, time: 20 },

//     { string: 1, fret: null, time: 20.5 },
//     { string: 2, fret: null, time: 20.5 },
//     { string: 3, fret: 2, time: 20.5 },
//     { string: 4, fret: 2, time: 20.5 },
//     { string: 5, fret: 0, time: 20.5 },
//     { string: 6, fret: null, time: 20.5 },

//     { string: 1, fret: null, time: 21 },
//     { string: 2, fret: null, time: 21 },
//     { string: 3, fret: 2, time: 21 },
//     { string: 4, fret: 0, time: 21 },
//     { string: 5, fret: 0, time: 21 },
//     { string: 6, fret: null, time: 21 },

//     { string: 1, fret: null, time: 21.5 },
//     { string: 2, fret: null, time: 21.5 },
//     { string: 3, fret: 2, time: 21.5 },
//     { string: 4, fret: 2, time: 21.5 },
//     { string: 5, fret: 0, time: 21.5 },
//     { string: 6, fret: null, time: 21.5},

//     { string: 1, fret: null, time: 22 },
//     { string: 2, fret: null, time: 22 },
//     { string: 3, fret: 2, time: 22 },
//     { string: 4, fret: 2, time: 22 },
//     { string: 5, fret: 0, time: 22 },
//     { string: 6, fret: null, time: 22},

//     { string: 1, fret: null, time: 22.5 },
//     { string: 2, fret: null, time: 22.5 },
//     { string: 3, fret: 2, time: 22.5 },
//     { string: 4, fret: 2, time: 22.5 },
//     { string: 5, fret: 0, time: 22.5 },
//     { string: 6, fret: null, time: 22.5},

//     { string: 1, fret: null, time: 23 },
//     { string: 2, fret: null, time: 23 },
//     { string: 3, fret: 2, time: 23 },
//     { string: 4, fret: 2, time: 23 },
//     { string: 5, fret: 0, time: 23 },
//     { string: 6, fret: null, time: 23},

//     { string: 1, fret: null, time: 23.5 },
//     { string: 2, fret: null, time: 23.5 },
//     { string: 3, fret: 2, time: 23.5 },
//     { string: 4, fret: 2, time: 23.5 },
//     { string: 5, fret: 0, time: 23.5 },
//     { string: 6, fret: null, time: 23.5},

//     { string: 1, fret: null, time: 24 },
//     { string: 2, fret: null, time: 24 },
//     { string: 3, fret: 2, time: 24 },
//     { string: 4, fret: 2, time: 24 },
//     { string: 5, fret: 0, time: 24 },
//     { string: 6, fret: null, time: 24},
// ];


// const App = () => {
//     const [currentTime, setCurrentTime] = useState(0);
    

//     const handleTimeUpdate = (time) => {
//         setCurrentTime(time);
//     };

//     return (
//         <View
//         style={styles.containerP}
//         >
//         <Text style={styles.title}>Tablature Player</Text>
//         <Player audioSrc={require('./assets/AudiosRock/Green Day - The Grouch.mp3')} onTimeUpdate={handleTimeUpdate} />

//             <ScrollView
//                 style={{
//                     flexGrow: 0,
//                     marginLeft: 30,
//                     marginRight: 30,
//                     height: hp(150),
//                 }}
//                 contentContainerStyle={{
//                     justifyContent: "center",
//                     alignItems: "center",
//                 }}
//                 horizontal={true}
//         >
//                 <View style={styles.container}>
//                     <Tablature tablature={sampleTablature} currentTime={currentTime} />
//                 </View>

//             </ScrollView>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         padding: 0,
//         // backgroundColor:"blue"
//     },
//     title: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginBottom: 20,
//     },
//     containerP:{
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         padding: 20,
//     },
//     ImagenG: {
//         width: 9,
//         height: 20,
//         alignSelf: "flex-start",
//         top: 1,
//         tintColor: "black",
//     },
// });

// export default App;





// import React, { useState  } from 'react';
// import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
// import Player from '../componentes/Player';
// import Tablature from '../componentes/Tablature';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

// const sampleTablature = [
//     // Tu arreglo de tablatura aquí...
//     { string: 1, fret: null, time: 0.1 },
//     { string: 2, fret: null, time: 0.1 },
//     { string: 3, fret: 2, time: 0.1 },
//     { string: 4, fret: 2, time: 0.1 },
//     { string: 5, fret: 0, time: 0.1 },
//     { string: 6, fret: null, time: 0.1 },

//     { string: 1, fret: null, time: 0.5 },
//     { string: 2, fret: null, time: 0.5 },
//     { string: 3, fret: 0, time: 0.5 },
//     { string: 4, fret: 0, time: 0.5 },
//     { string: 5, fret: 0, time: 0.5 },
//     { string: 6, fret: null, time: 0.5 },

//     { string: 1, fret: null, time: 1 },
//     { string: 2, fret: null, time: 1 },
//     { string: 3, fret: null, time: 1 },
//     { string: 4, fret: 2, time: 1 },
//     { string: 5, fret: 2, time: 1 },
//     { string: 6, fret: 0, time: 1},

//     { string: 1, fret: null, time: 1.5 },
//     { string: 2, fret: null, time: 1.5 },
//     { string: 3, fret: null, time: 1.5  },
//     { string: 4, fret: 2, time: 1.5  },
//     { string: 5, fret: 2, time: 1.5  },
//     { string: 6, fret: 0, time: 1.5  },

//     { string: 1, fret: null, time: 2},
//     { string: 2, fret: null, time: 2 },
//     { string: 3, fret: null, time: 2 },
//     { string: 4, fret: 0, time: 2 },
//     { string: 5, fret: 0, time: 2 },
//     { string: 6, fret: 0, time: 2},

//     { string: 1, fret: null, time: 2.5 },
//     { string: 2, fret: null, time: 2.5 },
//     { string: 3, fret: 2, time: 2.5 },
//     { string: 4, fret: 2, time: 2.5 },
//     { string: 5, fret: 0, time: 2.5 },
//     { string: 6, fret: null, time: 2.5 },

//     { string: 1, fret: null, time: 3 },
//     { string: 2, fret: null, time: 3 },
//     { string: 3, fret: 2, time: 3 },
//     { string: 4, fret: 2, time: 3 },
//     { string: 5, fret: 0, time: 3 },
//     { string: 6, fret: null, time: 3 },

//     { string: 1, fret: null, time: 3.5 },
//     { string: 2, fret: null, time: 3.5 },
//     { string: 3, fret: 0, time: 3.5 },
//     { string: 4, fret: 0, time: 3.5 },
//     { string: 5, fret: 0, time: 3.5 },
//     { string: 6, fret: null, time: 3.5 },

//     { string: 1, fret: null, time: 4 },
//     { string: 2, fret: 3, time: 4 },
//     { string: 3, fret: 2, time: 4 },
//     { string: 4, fret: 0, time: 4 },
//     { string: 5, fret: null, time: 4 },
//     { string: 6, fret: null, time: 4 },

//     { string: 1, fret: null, time: 4.5 },
//     { string: 2, fret: 3, time: 4.5 },
//     { string: 3, fret: 2, time: 4.5 },
//     { string: 4, fret: 0, time: 4.5 },
//     { string: 5, fret: null, time: 4.5 },
//     { string: 6, fret: null, time: 4.5 },

//     { string: 1, fret: null, time: 5 },
//     { string: 2, fret: 0, time: 5 },
//     { string: 3, fret: 0, time: 5 },
//     { string: 4, fret: 0, time: 5 },
//     { string: 5, fret: null, time: 5 },
//     { string: 6, fret: null, time: 5 },

//     { string: 1, fret: null, time: 5.5 },
//     { string: 2, fret: null, time: 5.5 },
//     { string: 3, fret: 2, time: 5.5 },
//     { string: 4, fret: 2, time: 5.5 },
//     { string: 5, fret: 0, time: 5.5 },
//     { string: 6, fret: null, time: 5.5 },

//     { string: 1, fret: null, time: 5.5 },
//     { string: 2, fret: null, time: 5.5 },
//     { string: 3, fret: 2, time: 5.5 },
//     { string: 4, fret: 2, time: 5.5 },
//     { string: 5, fret: 0, time: 5.5 },
//     { string: 6, fret: null, time: 5.5 },

//     { string: 1, fret: null, time: 5.5 },
//     { string: 2, fret: null, time: 5.5 },
//     { string: 3, fret: 0, time: 5.5 },
//     { string: 4, fret: 0, time: 5.5 },
//     { string: 5, fret: 0, time: 5.5 },
//     { string: 6, fret: null, time: 5.5 },

//     { string: 1, fret: null, time: 6 },
//     { string: 2, fret: null, time: 6 },
//     { string: 3, fret: null, time: 6 },
//     { string: 4, fret: 2, time: 6 },
//     { string: 5, fret: 2, time: 6 },
//     { string: 6, fret: 0, time: 6},

//     { string: 1, fret: null, time: 6.6 },
//     { string: 2, fret: null, time: 6.6 },
//     { string: 3, fret: null, time: 6.6 },
//     { string: 4, fret: 2, time: 6.6 },
//     { string: 5, fret: 2, time: 6.6 },
//     { string: 6, fret: 0, time: 6.6},

//     { string: 1, fret: null, time: 7 },
//     { string: 2, fret: null, time: 7 },
//     { string: 3, fret: null, time: 7 },
//     { string: 4, fret: 0, time: 7 },
//     { string: 5, fret: 0, time: 7 },
//     { string: 6, fret: 0, time: 7},

//     { string: 1, fret: null, time: 7.5 },
//     { string: 2, fret: 3, time: 7.5 },
//     { string: 3, fret: 2, time: 7.5 },
//     { string: 4, fret: 0, time: 7.5 },
//     { string: 5, fret: null, time: 7.5 },
//     { string: 6, fret: null, time: 7.5 },

//     { string: 1, fret: null, time: 8 },
//     { string: 2, fret: 3, time: 8 },
//     { string: 3, fret: 2, time: 8 },
//     { string: 4, fret: 0, time: 8 },
//     { string: 5, fret: null, time: 8 },
//     { string: 6, fret: null, time: 8 },

//     { string: 1, fret: null, time: 8.5 },
//     { string: 2, fret: null, time: 8.5 },
//     { string: 3, fret: 0, time: 8.5 },
//     { string: 4, fret: 0, time: 8.5 },
//     { string: 5, fret: 0, time: 8.5 },
//     { string: 6, fret: null, time: 8.5 },

//     { string: 1, fret: null, time: 9 },
//     { string: 2, fret: null, time: 9 },
//     { string: 3, fret: null, time: 9 },
//     { string: 4, fret: 2, time: 9 },
//     { string: 5, fret: 2, time: 9 },
//     { string: 6, fret: 0, time: 9},

//     { string: 1, fret: null, time: 9.5 },
//     { string: 2, fret: null, time: 9.5 },
//     { string: 3, fret: null, time: 9.5 },
//     { string: 4, fret: 2, time: 9.5 },
//     { string: 5, fret: 2, time: 9.5 },
//     { string: 6, fret: 0, time: 9.5},

//     { string: 1, fret: null, time: 10 },
//     { string: 2, fret: null, time: 10 },
//     { string: 3, fret: null, time: 10 },
//     { string: 4, fret: 2, time: 10 },
//     { string: 5, fret: 2, time: 10 },
//     { string: 6, fret: 0, time: 10},

//     { string: 1, fret: null, time: 10.5 },
//     { string: 2, fret: null, time: 10.5 },
//     { string: 3, fret: null, time: 10.5 },
//     { string: 4, fret: 2, time: 10.5 },
//     { string: 5, fret: 2, time: 10.5 },
//     { string: 6, fret: 0, time: 10.5},

//     { string: 1, fret: null, time: 11 },
//     { string: 2, fret: null, time: 11 },
//     { string: 3, fret: null, time: 11 },
//     { string: 4, fret: 2, time: 11 },
//     { string: 5, fret: 2, time: 11 },
//     { string: 6, fret: 0, time: 11},
// //_______________________________________________________________

//     { string: 1, fret: null, time: 11.5 },
//     { string: 2, fret: null, time: 11.5 },
//     { string: 3, fret: 2, time: 11.5 },
//     { string: 4, fret: 2, time: 11.5 },
//     { string: 5, fret: 0, time: 11.5 },
//     { string: 6, fret: null, time: 11.5 },

//     { string: 1, fret: null, time: 12 },
//     { string: 2, fret: null, time: 12 },
//     { string: 3, fret: 0, time: 12 },
//     { string: 4, fret: 0, time: 12 },
//     { string: 5, fret: 0, time: 12 },
//     { string: 6, fret: null, time: 12 },

//     { string: 1, fret: null, time: 12.5 },
//     { string: 2, fret: null, time: 12.5 },
//     { string: 3, fret: null, time: 12.5 },
//     { string: 4, fret: 2, time: 12.5 },
//     { string: 5, fret: 2, time: 12.5 },
//     { string: 6, fret: 0, time: 12.5},

//     { string: 1, fret: null, time: 13 },
//     { string: 2, fret: null, time: 13 },
//     { string: 3, fret: null, time: 13  },
//     { string: 4, fret: 2, time: 13  },
//     { string: 5, fret: 2, time: 13  },
//     { string: 6, fret: 0, time: 13  },

//     { string: 1, fret: null, time: 13.5},
//     { string: 2, fret: null, time: 13.5 },
//     { string: 3, fret: null, time: 13.5 },
//     { string: 4, fret: 0, time: 13.5 },
//     { string: 5, fret: 0, time: 13.5 },
//     { string: 6, fret: 0, time: 13.5},

//     { string: 1, fret: null, time: 14 },
//     { string: 2, fret: null, time: 14 },
//     { string: 3, fret: 2, time: 14 },
//     { string: 4, fret: 2, time: 14 },
//     { string: 5, fret: 0, time: 14 },
//     { string: 6, fret: null, time: 14 },

//     { string: 1, fret: null, time: 14.5 },
//     { string: 2, fret: null, time: 14.5 },
//     { string: 3, fret: 2, time: 14.5 },
//     { string: 4, fret: 2, time: 14.5 },
//     { string: 5, fret: 0, time: 14.5 },
//     { string: 6, fret: null, time: 14.5 },

//     { string: 1, fret: null, time: 15 },
//     { string: 2, fret: null, time: 15 },
//     { string: 3, fret: 0, time: 15 },
//     { string: 4, fret: 0, time: 15 },
//     { string: 5, fret: 0, time: 15 },
//     { string: 6, fret: null, time: 15 },

//     { string: 1, fret: null, time: 15.5 },
//     { string: 2, fret: 3, time: 15.5 },
//     { string: 3, fret: 2, time: 15.5 },
//     { string: 4, fret: 0, time: 15.5 },
//     { string: 5, fret: null, time: 15.5 },
//     { string: 6, fret: null, time: 15.5 },

//     { string: 1, fret: null, time: 16 },
//     { string: 2, fret: 3, time: 16 },
//     { string: 3, fret: 2, time: 16 },
//     { string: 4, fret: 0, time: 16 },
//     { string: 5, fret: null, time: 16 },
//     { string: 6, fret: null, time: 16 },

//     { string: 1, fret: null, time: 16.5 },
//     { string: 2, fret: 0, time: 16.5 },
//     { string: 3, fret: 0, time: 16.5 },
//     { string: 4, fret: 0, time: 16.5 },
//     { string: 5, fret: null, time: 16.5 },
//     { string: 6, fret: null, time: 16.5 },

//     { string: 1, fret: null, time: 17 },
//     { string: 2, fret: null, time: 17 },
//     { string: 3, fret: 2, time: 17 },
//     { string: 4, fret: 2, time: 17 },
//     { string: 5, fret: 0, time: 17 },
//     { string: 6, fret: null, time: 17 },

//     { string: 1, fret: null, time: 17.5 },
//     { string: 2, fret: null, time: 17.5 },
//     { string: 3, fret: 2, time: 17.5 },
//     { string: 4, fret: 2, time: 17.5 },
//     { string: 5, fret: 0, time: 17.5 },
//     { string: 6, fret: null, time: 17.5 },

//     { string: 1, fret: null, time: 18 },
//     { string: 2, fret: null, time: 18 },
//     { string: 3, fret: 0, time: 18 },
//     { string: 4, fret: 0, time: 18 },
//     { string: 5, fret: 0, time: 18 },
//     { string: 6, fret: null, time: 18 },

//     { string: 1, fret: null, time: 18.5 },
//     { string: 2, fret: null, time: 18.5 },
//     { string: 3, fret: null, time: 18.5 },
//     { string: 4, fret: 2, time: 18.5 },
//     { string: 5, fret: 2, time: 18.5 },
//     { string: 6, fret: 0, time: 18.5},

//     { string: 1, fret: null, time: 19 },
//     { string: 2, fret: null, time: 19 },
//     { string: 3, fret: null, time: 19 },
//     { string: 4, fret: 2, time: 19 },
//     { string: 5, fret: 2, time: 19 },
//     { string: 6, fret: 0, time: 19},

//     { string: 1, fret: null, time: 19.5 },
//     { string: 2, fret: null, time: 19.5 },
//     { string: 3, fret: null, time: 19.5 },
//     { string: 4, fret: 0, time: 19.5 },
//     { string: 5, fret: 0, time: 19.5 },
//     { string: 6, fret: 0, time: 19.5},

//     { string: 1, fret: null, time: 20 },
//     { string: 2, fret: null, time: 20 },
//     { string: 3, fret: 2, time: 20 },
//     { string: 4, fret: 2, time: 20 },
//     { string: 5, fret: 0, time: 20 },
//     { string: 6, fret: null, time: 20 },

//     { string: 1, fret: null, time: 20.5 },
//     { string: 2, fret: null, time: 20.5 },
//     { string: 3, fret: 2, time: 20.5 },
//     { string: 4, fret: 2, time: 20.5 },
//     { string: 5, fret: 0, time: 20.5 },
//     { string: 6, fret: null, time: 20.5 },

//     { string: 1, fret: null, time: 21 },
//     { string: 2, fret: null, time: 21 },
//     { string: 3, fret: 2, time: 21 },
//     { string: 4, fret: 0, time: 21 },
//     { string: 5, fret: 0, time: 21 },
//     { string: 6, fret: null, time: 21 },

//     { string: 1, fret: null, time: 21.5 },
//     { string: 2, fret: null, time: 21.5 },
//     { string: 3, fret: 2, time: 21.5 },
//     { string: 4, fret: 2, time: 21.5 },
//     { string: 5, fret: 0, time: 21.5 },
//     { string: 6, fret: null, time: 21.5},

//     { string: 1, fret: null, time: 22 },
//     { string: 2, fret: null, time: 22 },
//     { string: 3, fret: 2, time: 22 },
//     { string: 4, fret: 2, time: 22 },
//     { string: 5, fret: 0, time: 22 },
//     { string: 6, fret: null, time: 22},

//     { string: 1, fret: null, time: 22.5 },
//     { string: 2, fret: null, time: 22.5 },
//     { string: 3, fret: 2, time: 22.5 },
//     { string: 4, fret: 2, time: 22.5 },
//     { string: 5, fret: 0, time: 22.5 },
//     { string: 6, fret: null, time: 22.5},

//     { string: 1, fret: null, time: 23 },
//     { string: 2, fret: null, time: 23 },
//     { string: 3, fret: 2, time: 23 },
//     { string: 4, fret: 2, time: 23 },
//     { string: 5, fret: 0, time: 23 },
//     { string: 6, fret: null, time: 23},

//     { string: 1, fret: null, time: 23.5 },
//     { string: 2, fret: null, time: 23.5 },
//     { string: 3, fret: 2, time: 23.5 },
//     { string: 4, fret: 2, time: 23.5 },
//     { string: 5, fret: 0, time: 23.5 },
//     { string: 6, fret: null, time: 23.5},

//     { string: 1, fret: null, time: 24 },
//     { string: 2, fret: null, time: 24 },
//     { string: 3, fret: 2, time: 24 },
//     { string: 4, fret: 2, time: 24 },
//     { string: 5, fret: 0, time: 24 },
//     { string: 6, fret: null, time: 24},
// ];

// const App = () => {
//     const [currentTime, setCurrentTime] = useState(0);

//     const handleTimeUpdate = (time) => {
//         setCurrentTime(time);
//     };

//     const getImagePosition = () => {
//         const totalTime = sampleTablature[sampleTablature.length - 1].time;
//         const containerWidth = wp(100);

//         const currentPosition = (currentTime / totalTime) * containerWidth;

//         return currentPosition;
//     };

//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>Tablature Player</Text>
//             <Player audioSrc={require('./assets/AudiosRock/Green Day - The Grouch.mp3')} onTimeUpdate={handleTimeUpdate} />

//             <ScrollView
//                 style={styles.tablatureContainer}
//                 horizontal={true}
//                 contentContainerStyle={styles.tablatureContent}
//             >
//                 <Image
//                     source={require('../image/ClaveSol.png')}  // Replace with your actual image source
//                     style={[styles.ImagenG, { left: getImagePosition() }]}  // Adjust style as per your image
//                 />
//                 <Tablature tablature={sampleTablature} currentTime={currentTime} />
//             </ScrollView>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         padding: 20,
//     },
//     title: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginBottom: 20,
//     },
//     tablatureContainer: {
//         flexGrow: 0,
//         marginLeft: 30,
//         marginRight: 30,
//         height: hp(150),
//     },
//     tablatureContent: {
//         justifyContent: "center",
//         alignItems: "center",
//     },
//     ImagenG: {
//         width: 20,  // Adjust width and height as per your image size
//         height: 40,
//         position: 'absolute',  // Adjust position as per your requirement
//         top: 0,
//     },
// });

// export default App;

// // src/App.js
// import React, { useState } from 'react';
// import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
// import Player from '../componentes/Player';
// import Tablature from '../componentes/Tablature';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

// const sampleTablature = [
//     { string: 1, fret: null, time: 0.1 },
//     { string: 2, fret: null, time: 0.1 },
//     { string: 3, fret: 2, time: 0.1 },
//     { string: 4, fret: 2, time: 0.1 },
//     { string: 5, fret: 0, time: 0.1 },
//     { string: 6, fret: null, time: 0.1 },

//     { string: 1, fret: null, time: 0.5 },
//     { string: 2, fret: null, time: 0.5 },
//     { string: 3, fret: 0, time: 0.5 },
//     { string: 4, fret: 0, time: 0.5 },
//     { string: 5, fret: 0, time: 0.5 },
//     { string: 6, fret: null, time: 0.5 },

//     { string: 1, fret: null, time: 1 },
//     { string: 2, fret: null, time: 1 },
//     { string: 3, fret: null, time: 1 },
//     { string: 4, fret: 2, time: 1 },
//     { string: 5, fret: 2, time: 1 },
//     { string: 6, fret: 0, time: 1},

//     { string: 1, fret: null, time: 1.5 },
//     { string: 2, fret: null, time: 1.5 },
//     { string: 3, fret: null, time: 1.5  },
//     { string: 4, fret: 2, time: 1.5  },
//     { string: 5, fret: 2, time: 1.5  },
//     { string: 6, fret: 0, time: 1.5  },

//     { string: 1, fret: null, time: 2},
//     { string: 2, fret: null, time: 2 },
//     { string: 3, fret: null, time: 2 },
//     { string: 4, fret: 0, time: 2 },
//     { string: 5, fret: 0, time: 2 },
//     { string: 6, fret: 0, time: 2},

//     { string: 1, fret: null, time: 2.5 },
//     { string: 2, fret: null, time: 2.5 },
//     { string: 3, fret: 2, time: 2.5 },
//     { string: 4, fret: 2, time: 2.5 },
//     { string: 5, fret: 0, time: 2.5 },
//     { string: 6, fret: null, time: 2.5 },

//     { string: 1, fret: null, time: 3 },
//     { string: 2, fret: null, time: 3 },
//     { string: 3, fret: 2, time: 3 },
//     { string: 4, fret: 2, time: 3 },
//     { string: 5, fret: 0, time: 3 },
//     { string: 6, fret: null, time: 3 },

//     { string: 1, fret: null, time: 3.5 },
//     { string: 2, fret: null, time: 3.5 },
//     { string: 3, fret: 0, time: 3.5 },
//     { string: 4, fret: 0, time: 3.5 },
//     { string: 5, fret: 0, time: 3.5 },
//     { string: 6, fret: null, time: 3.5 },

//     { string: 1, fret: null, time: 4 },
//     { string: 2, fret: 3, time: 4 },
//     { string: 3, fret: 2, time: 4 },
//     { string: 4, fret: 0, time: 4 },
//     { string: 5, fret: null, time: 4 },
//     { string: 6, fret: null, time: 4 },

//     { string: 1, fret: null, time: 4.5 },
//     { string: 2, fret: 3, time: 4.5 },
//     { string: 3, fret: 2, time: 4.5 },
//     { string: 4, fret: 0, time: 4.5 },
//     { string: 5, fret: null, time: 4.5 },
//     { string: 6, fret: null, time: 4.5 },

//     { string: 1, fret: null, time: 5 },
//     { string: 2, fret: 0, time: 5 },
//     { string: 3, fret: 0, time: 5 },
//     { string: 4, fret: 0, time: 5 },
//     { string: 5, fret: null, time: 5 },
//     { string: 6, fret: null, time: 5 },

//     { string: 1, fret: null, time: 5.5 },
//     { string: 2, fret: null, time: 5.5 },
//     { string: 3, fret: 2, time: 5.5 },
//     { string: 4, fret: 2, time: 5.5 },
//     { string: 5, fret: 0, time: 5.5 },
//     { string: 6, fret: null, time: 5.5 },

//     { string: 1, fret: null, time: 5.5 },
//     { string: 2, fret: null, time: 5.5 },
//     { string: 3, fret: 2, time: 5.5 },
//     { string: 4, fret: 2, time: 5.5 },
//     { string: 5, fret: 0, time: 5.5 },
//     { string: 6, fret: null, time: 5.5 },

//     { string: 1, fret: null, time: 5.5 },
//     { string: 2, fret: null, time: 5.5 },
//     { string: 3, fret: 0, time: 5.5 },
//     { string: 4, fret: 0, time: 5.5 },
//     { string: 5, fret: 0, time: 5.5 },
//     { string: 6, fret: null, time: 5.5 },

//     { string: 1, fret: null, time: 6 },
//     { string: 2, fret: null, time: 6 },
//     { string: 3, fret: null, time: 6 },
//     { string: 4, fret: 2, time: 6 },
//     { string: 5, fret: 2, time: 6 },
//     { string: 6, fret: 0, time: 6},

//     { string: 1, fret: null, time: 6.6 },
//     { string: 2, fret: null, time: 6.6 },
//     { string: 3, fret: null, time: 6.6 },
//     { string: 4, fret: 2, time: 6.6 },
//     { string: 5, fret: 2, time: 6.6 },
//     { string: 6, fret: 0, time: 6.6},

//     { string: 1, fret: null, time: 7 },
//     { string: 2, fret: null, time: 7 },
//     { string: 3, fret: null, time: 7 },
//     { string: 4, fret: 0, time: 7 },
//     { string: 5, fret: 0, time: 7 },
//     { string: 6, fret: 0, time: 7},

//     { string: 1, fret: null, time: 7.5 },
//     { string: 2, fret: 3, time: 7.5 },
//     { string: 3, fret: 2, time: 7.5 },
//     { string: 4, fret: 0, time: 7.5 },
//     { string: 5, fret: null, time: 7.5 },
//     { string: 6, fret: null, time: 7.5 },

//     { string: 1, fret: null, time: 8 },
//     { string: 2, fret: 3, time: 8 },
//     { string: 3, fret: 2, time: 8 },
//     { string: 4, fret: 0, time: 8 },
//     { string: 5, fret: null, time: 8 },
//     { string: 6, fret: null, time: 8 },

//     { string: 1, fret: null, time: 8.5 },
//     { string: 2, fret: null, time: 8.5 },
//     { string: 3, fret: 0, time: 8.5 },
//     { string: 4, fret: 0, time: 8.5 },
//     { string: 5, fret: 0, time: 8.5 },
//     { string: 6, fret: null, time: 8.5 },

//     { string: 1, fret: null, time: 9 },
//     { string: 2, fret: null, time: 9 },
//     { string: 3, fret: null, time: 9 },
//     { string: 4, fret: 2, time: 9 },
//     { string: 5, fret: 2, time: 9 },
//     { string: 6, fret: 0, time: 9},

//     { string: 1, fret: null, time: 9.5 },
//     { string: 2, fret: null, time: 9.5 },
//     { string: 3, fret: null, time: 9.5 },
//     { string: 4, fret: 2, time: 9.5 },
//     { string: 5, fret: 2, time: 9.5 },
//     { string: 6, fret: 0, time: 9.5},

//     { string: 1, fret: null, time: 10 },
//     { string: 2, fret: null, time: 10 },
//     { string: 3, fret: null, time: 10 },
//     { string: 4, fret: 2, time: 10 },
//     { string: 5, fret: 2, time: 10 },
//     { string: 6, fret: 0, time: 10},

//     { string: 1, fret: null, time: 10.5 },
//     { string: 2, fret: null, time: 10.5 },
//     { string: 3, fret: null, time: 10.5 },
//     { string: 4, fret: 2, time: 10.5 },
//     { string: 5, fret: 2, time: 10.5 },
//     { string: 6, fret: 0, time: 10.5},

//     { string: 1, fret: null, time: 11 },
//     { string: 2, fret: null, time: 11 },
//     { string: 3, fret: null, time: 11 },
//     { string: 4, fret: 2, time: 11 },
//     { string: 5, fret: 2, time: 11 },
//     { string: 6, fret: 0, time: 11},
// //_______________________________________________________________

//     { string: 1, fret: null, time: 11.5 },
//     { string: 2, fret: null, time: 11.5 },
//     { string: 3, fret: 2, time: 11.5 },
//     { string: 4, fret: 2, time: 11.5 },
//     { string: 5, fret: 0, time: 11.5 },
//     { string: 6, fret: null, time: 11.5 },

//     { string: 1, fret: null, time: 12 },
//     { string: 2, fret: null, time: 12 },
//     { string: 3, fret: 0, time: 12 },
//     { string: 4, fret: 0, time: 12 },
//     { string: 5, fret: 0, time: 12 },
//     { string: 6, fret: null, time: 12 },

//     { string: 1, fret: null, time: 12.5 },
//     { string: 2, fret: null, time: 12.5 },
//     { string: 3, fret: null, time: 12.5 },
//     { string: 4, fret: 2, time: 12.5 },
//     { string: 5, fret: 2, time: 12.5 },
//     { string: 6, fret: 0, time: 12.5},

//     { string: 1, fret: null, time: 13 },
//     { string: 2, fret: null, time: 13 },
//     { string: 3, fret: null, time: 13  },
//     { string: 4, fret: 2, time: 13  },
//     { string: 5, fret: 2, time: 13  },
//     { string: 6, fret: 0, time: 13  },

//     { string: 1, fret: null, time: 13.5},
//     { string: 2, fret: null, time: 13.5 },
//     { string: 3, fret: null, time: 13.5 },
//     { string: 4, fret: 0, time: 13.5 },
//     { string: 5, fret: 0, time: 13.5 },
//     { string: 6, fret: 0, time: 13.5},

//     { string: 1, fret: null, time: 14 },
//     { string: 2, fret: null, time: 14 },
//     { string: 3, fret: 2, time: 14 },
//     { string: 4, fret: 2, time: 14 },
//     { string: 5, fret: 0, time: 14 },
//     { string: 6, fret: null, time: 14 },

//     { string: 1, fret: null, time: 14.5 },
//     { string: 2, fret: null, time: 14.5 },
//     { string: 3, fret: 2, time: 14.5 },
//     { string: 4, fret: 2, time: 14.5 },
//     { string: 5, fret: 0, time: 14.5 },
//     { string: 6, fret: null, time: 14.5 },

//     { string: 1, fret: null, time: 15 },
//     { string: 2, fret: null, time: 15 },
//     { string: 3, fret: 0, time: 15 },
//     { string: 4, fret: 0, time: 15 },
//     { string: 5, fret: 0, time: 15 },
//     { string: 6, fret: null, time: 15 },

//     { string: 1, fret: null, time: 15.5 },
//     { string: 2, fret: 3, time: 15.5 },
//     { string: 3, fret: 2, time: 15.5 },
//     { string: 4, fret: 0, time: 15.5 },
//     { string: 5, fret: null, time: 15.5 },
//     { string: 6, fret: null, time: 15.5 },

//     { string: 1, fret: null, time: 16 },
//     { string: 2, fret: 3, time: 16 },
//     { string: 3, fret: 2, time: 16 },
//     { string: 4, fret: 0, time: 16 },
//     { string: 5, fret: null, time: 16 },
//     { string: 6, fret: null, time: 16 },

//     { string: 1, fret: null, time: 16.5 },
//     { string: 2, fret: 0, time: 16.5 },
//     { string: 3, fret: 0, time: 16.5 },
//     { string: 4, fret: 0, time: 16.5 },
//     { string: 5, fret: null, time: 16.5 },
//     { string: 6, fret: null, time: 16.5 },

//     { string: 1, fret: null, time: 17 },
//     { string: 2, fret: null, time: 17 },
//     { string: 3, fret: 2, time: 17 },
//     { string: 4, fret: 2, time: 17 },
//     { string: 5, fret: 0, time: 17 },
//     { string: 6, fret: null, time: 17 },

//     { string: 1, fret: null, time: 17.5 },
//     { string: 2, fret: null, time: 17.5 },
//     { string: 3, fret: 2, time: 17.5 },
//     { string: 4, fret: 2, time: 17.5 },
//     { string: 5, fret: 0, time: 17.5 },
//     { string: 6, fret: null, time: 17.5 },

//     { string: 1, fret: null, time: 18 },
//     { string: 2, fret: null, time: 18 },
//     { string: 3, fret: 0, time: 18 },
//     { string: 4, fret: 0, time: 18 },
//     { string: 5, fret: 0, time: 18 },
//     { string: 6, fret: null, time: 18 },

//     { string: 1, fret: null, time: 18.5 },
//     { string: 2, fret: null, time: 18.5 },
//     { string: 3, fret: null, time: 18.5 },
//     { string: 4, fret: 2, time: 18.5 },
//     { string: 5, fret: 2, time: 18.5 },
//     { string: 6, fret: 0, time: 18.5},

//     { string: 1, fret: null, time: 19 },
//     { string: 2, fret: null, time: 19 },
//     { string: 3, fret: null, time: 19 },
//     { string: 4, fret: 2, time: 19 },
//     { string: 5, fret: 2, time: 19 },
//     { string: 6, fret: 0, time: 19},

//     { string: 1, fret: null, time: 19.5 },
//     { string: 2, fret: null, time: 19.5 },
//     { string: 3, fret: null, time: 19.5 },
//     { string: 4, fret: 0, time: 19.5 },
//     { string: 5, fret: 0, time: 19.5 },
//     { string: 6, fret: 0, time: 19.5},

//     { string: 1, fret: null, time: 20 },
//     { string: 2, fret: null, time: 20 },
//     { string: 3, fret: 2, time: 20 },
//     { string: 4, fret: 2, time: 20 },
//     { string: 5, fret: 0, time: 20 },
//     { string: 6, fret: null, time: 20 },

//     { string: 1, fret: null, time: 20.5 },
//     { string: 2, fret: null, time: 20.5 },
//     { string: 3, fret: 2, time: 20.5 },
//     { string: 4, fret: 2, time: 20.5 },
//     { string: 5, fret: 0, time: 20.5 },
//     { string: 6, fret: null, time: 20.5 },

//     { string: 1, fret: null, time: 21 },
//     { string: 2, fret: null, time: 21 },
//     { string: 3, fret: 2, time: 21 },
//     { string: 4, fret: 0, time: 21 },
//     { string: 5, fret: 0, time: 21 },
//     { string: 6, fret: null, time: 21 },

//     { string: 1, fret: null, time: 21.5 },
//     { string: 2, fret: null, time: 21.5 },
//     { string: 3, fret: 2, time: 21.5 },
//     { string: 4, fret: 2, time: 21.5 },
//     { string: 5, fret: 0, time: 21.5 },
//     { string: 6, fret: null, time: 21.5},

//     { string: 1, fret: null, time: 22 },
//     { string: 2, fret: null, time: 22 },
//     { string: 3, fret: 2, time: 22 },
//     { string: 4, fret: 2, time: 22 },
//     { string: 5, fret: 0, time: 22 },
//     { string: 6, fret: null, time: 22},

//     { string: 1, fret: null, time: 22.5 },
//     { string: 2, fret: null, time: 22.5 },
//     { string: 3, fret: 2, time: 22.5 },
//     { string: 4, fret: 2, time: 22.5 },
//     { string: 5, fret: 0, time: 22.5 },
//     { string: 6, fret: null, time: 22.5},

//     { string: 1, fret: null, time: 23 },
//     { string: 2, fret: null, time: 23 },
//     { string: 3, fret: 2, time: 23 },
//     { string: 4, fret: 2, time: 23 },
//     { string: 5, fret: 0, time: 23 },
//     { string: 6, fret: null, time: 23},

//     { string: 1, fret: null, time: 23.5 },
//     { string: 2, fret: null, time: 23.5 },
//     { string: 3, fret: 2, time: 23.5 },
//     { string: 4, fret: 2, time: 23.5 },
//     { string: 5, fret: 0, time: 23.5 },
//     { string: 6, fret: null, time: 23.5},

//     { string: 1, fret: null, time: 24 },
//     { string: 2, fret: null, time: 24 },
//     { string: 3, fret: 2, time: 24 },
//     { string: 4, fret: 2, time: 24 },
//     { string: 5, fret: 0, time: 24 },
//     { string: 6, fret: null, time: 24},
// ];


// const App = () => {
//     const [currentTime, setCurrentTime] = useState(0);
    

//     const handleTimeUpdate = (time) => {
//         setCurrentTime(time);
//     };

//     return (
//         <View
//         style={styles.containerP}
//         >
//         <Text style={styles.title}>Tablature Player</Text>
//         <Player audioSrc={require('./assets/AudiosRock/Green Day - The Grouch.mp3')} onTimeUpdate={handleTimeUpdate} />

//             <ScrollView
//                 style={{
//                     flexGrow: 0,
//                     marginLeft: 30,
//                     marginRight: 30,
//                     height: hp(150),
//                 }}
//                 contentContainerStyle={{
//                     justifyContent: "center",
//                     alignItems: "center",
//                 }}
//                 horizontal={true}
//         >
//                 <View style={styles.container}>
                    
//                     <Image
//                         source={require('../image/ClaveSol.png')}
//                         style={styles.ImagenG}
//                     >
                        
//                     </Image>
//                     <Tablature tablature={sampleTablature} currentTime={currentTime} />
//                 </View>

//             </ScrollView>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         padding: 0,
//         // backgroundColor:"blue"
//     },
//     title: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginBottom: 20,
//     },
//     containerP:{
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         padding: 20,
//     },
//     ImagenG: {
//         width: 9,
//         height: 20,
//         alignSelf: "flex-start",
//         top: 1,
//         tintColor: "black",
//     },
// });

// export default App;
