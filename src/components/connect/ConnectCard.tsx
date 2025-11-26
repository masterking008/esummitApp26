import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { getTime } from '../../utils/helper';
import { Button } from 'react-native-paper';
import { useaccept, usesendRequest } from '../../hooks/mutation/user-action-mutation';
import { useProfileStore } from '../../store/profile-store';
import { useToast } from 'react-native-toast-notifications';
import { useNavigation } from '@react-navigation/native';

interface IConnectBoxProps {
  id: string;
  url: string;
  name: string;
  company_name: string;
  persontype: string;
  btnText: string;
//   startTime: Date | undefined;
//   endTime: Date | undefined;
  description: string;
  navigation: any;
}

export const ConnectCard = (props: IConnectBoxProps) => {
  // const ImageComponent = useMemo(() => {
  //   return (
  //     {persontype === 'Founder'? (
  //       <Image
  //       source={require('../../assets/images/fb.png')}
  //       resizeMode={'cover'}
  //       style={styles.image}
  //     />
  //     ): (<></>)}
  //   );
  // }, [props.url]);

  const toast = useToast()
  const navigation = useNavigation()

  const email = useProfileStore(state => state.email)

  const { mutateAsync: sendRequest } = usesendRequest()
  const { mutateAsync: accept } = useaccept()

  const [connecttext, setconnecttext] = useState('')
  const [isdisable, setdisable] = useState(false)

  const handleSubmit = () => {
    const id = props.id
    if(connecttext === 'Connect'){
      sendRequest({email, id: id}).then(data => {
        if(data.success){
          toast.show('Connection Request Sent!' , { type: 'success' })
          setconnecttext('Requested')
        }
        else{
          toast.show('Some error occqured. Try Later', { type: 'danger' })
        }
      })
    }
    else if(connecttext === 'Accept'){
      accept({ id: id, email: email }).then((data) => {
        if (data.success) {
          toast.show("Success!", { type: "success" });
          setconnecttext('Know more')
        } else {
          toast.show("Some error occqured. Try Later", { type: "danger" });
        }
      });
    }
    else if(connecttext === 'Know more'){
      props.navigation.navigate('SingleConnect', { id: props.id })
    }
    else{
      setdisable(true)
    }
  }

  useEffect(() => {
    setconnecttext(props.btnText)
    if(connecttext === 'Requested'){
      setdisable(true)
    }
    else{
      setdisable(false)
    }
  }, [props.btnText])

  return (
    <TouchableOpacity onPress={() => props.navigation.navigate('SingleConnect', { id: props.id })}>
      <View
      style={styles.container}>
      <View style={styles.container2}>
        <View style={styles.content}>
          {props.persontype === 'Founder'? (
            <Image source={require('../../assets/images/founder.png')} />
          ): props.persontype==='Mentor'?(
            <Image source={require('../../assets/images/mentor.png')} />
          ): props.persontype === 'Professional'? (
            <Image source={require('../../assets/images/prof.png')} />
          ): props.persontype === 'Student'?(
            <Image source={require('../../assets/images/student.png')} />
          ):(
            <Image source={require('../../assets/images/investor.png')} />
          )}
          {/* {ImageComponent} */}
        </View>
        {/* <View style={styles.flag}>
          <Text style={styles.flagText}>
            {getTime(props.startTime)} - {getTime(props.endTime)}
          </Text>
        </View> */}

        <View style={styles.content2}>
          {props.name === null || props.name === undefined? (
            <Text style={styles.event}>Field is empty</Text>
          ): (
            <Text style={styles.event}>{props.name}</Text>
          )}

{props.company_name === null || props.company_name === undefined? (
            <Text style={styles.venue}>Field is empty</Text>
          ): (
            <Text numberOfLines={2} style={styles.venue}>{props.company_name}</Text>
          )}

{props.persontype === null || props.persontype === undefined? (
            <Text style={styles.persontype}>{'\u2B24'} Field is empty</Text>
          ): (
            <Text style={styles.persontype}>{'\u2B24'} {props.persontype}</Text>
          )}
          
          {/* <Text style={styles.persontype}>{'\u2B24'} {props.persontype}</Text> */}
          {/* <Text style={styles.venue}>Time : {getTime(props.startTime)} - {getTime(props.endTime)}</Text> */}
        </View>
        <View style={{marginTop: 10}}>
          <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={isdisable}>
            <Text style={styles.buttonText}>{connecttext}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    width: Dimensions.get('window').width / 2 - 20,
    height: Dimensions.get('window').height / 2.5,
  },
  container2: {
    width: '100%',
    backgroundColor: '#1e1e1e',
    borderColor: '#FFE100',
    borderWidth: 1,
    borderRadius: 16,
    padding: 20,
    justifyContent: 'space-between',
    height: '100%',
    shadowColor: '#FFE100',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  flag: {
    width: 80,
    backgroundColor: '#FFE100',
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderRadius: 6,
    position: 'absolute',
    right: -3,
    top: 19,
  },
  flagText: {
    fontFamily: 'Proxima',
    textAlign: 'center',
    fontSize: 7,
    lineHeight: 9,
    color: '#1e1e1e',
    fontWeight: '600',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  content: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
  },
  content2: {
    paddingVertical: 10,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flex: 1,
  },
  event: {
    fontFamily: 'ProximaBold',
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
    letterSpacing: 0.3,
  },
  venue: {
    fontFamily: 'Proxima',
    color: '#cccccc',
    fontSize: 13,
    marginBottom: 6,
    lineHeight: 18,
  },
  persontype: {
    fontFamily: 'Proxima',
    color: '#FFE100',
    fontSize: 11,
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  button: {
    paddingHorizontal: 16,
    height: 38,
    borderRadius: 24,
    backgroundColor: '#FFE100',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    // shadowColor: '#FFE100',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.3,
    // shadowRadius: 4,
    // elevation: 3,
  },
  buttonText: {
    fontFamily: 'ProximaBold',
    fontSize: 13,
    color: '#1e1e1e',
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
});
