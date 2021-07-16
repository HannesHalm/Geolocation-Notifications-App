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
          //fontFamily: 'helvetica',
          fontSize: 18,
          color: '#333',
          padding: 8,
      },
      paragraph: {
          //fontFamily: 'helvetica',
          marginVertical: 8,
          lineHeight: 20,
          padding: 8,
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