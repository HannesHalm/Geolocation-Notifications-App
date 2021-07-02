import { StyleSheet } from 'react-native';

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
        marginBottom: 10,
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
      }
    
});