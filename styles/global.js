import { StyleSheet, Dimensions } from 'react-native';

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 8,
        //alignItems: 'center',
        //justifyContent: 'center',
      }, 
      titleText: {
          fontWeight: 'bold',
          fontSize: 18,
          color: '#333',
          padding: 8,
      },
      paragraph: {
          marginHorizontal: 10,
          lineHeight: 10,
          padding: 6,
      },
      subtitle: {

        marginHorizontal: 4,
        lineHeight: 10,
        padding: 6,
    },
      input: {
        padding: 8,
        marginBottom: 10,
        borderWidth: 1,
        borderRadius: 5, 
        borderColor: '#ddd',
        fontSize: 18,
        justifyContent: 'flex-start',
      },
      modalToggle: {
          padding: 8,
          borderWidth: 0,
          borderRadius: 10,
          borderColor:  'lightgrey',
          marginBottom: 16,
          alignSelf: 'center',
      },
      map: {
        width: '100%',
        height: '50%', 
        flexGrow: 1
          
      }
    
});