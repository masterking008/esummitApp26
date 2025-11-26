import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ActivityIndicator, Divider, List } from 'react-native-paper';
import { useFaq } from '../../hooks/query/other-query';

export const Faq = () => {
  const { data: FaqData, isLoading } = useFaq();

  return (
    <View style={styles.content}>
      <Text style={styles.title}>FAQs</Text>
      <Divider style={styles.divider} />
      {isLoading ? (
        <ActivityIndicator
          animating={true}
          color="#FFE100"
          size="small"
          style={{ marginTop: 20 }}
        />
      ) : (
        FaqData?.data.map((faq, index) => (
          <View key={index}>
            <List.Accordion
              title={faq.question}
              style={styles.accordion}
              titleStyle={styles.accordionTitle}
              titleNumberOfLines={3}
              id={1}
              theme={{colors: {background: 'transparent'}}}
              right={props => (
                <List.Icon
                  {...props}
                  icon={props.isExpanded ? 'chevron-up' : 'chevron-down'}
                  color="#FFFFFF"
                />
              )}>
              <View style={styles.accordionAnswer}>
                <Text style={styles.accordionAnswersText}>{faq.answer}</Text>
              </View>
            </List.Accordion>
          </View>
        ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  // m4: {
  //   marginTop: 20,
  // },
  content: {
    width: '100%',
    alignSelf: 'center',
    // paddingTop: 20,
    // paddingBottom: 30,
    // backgroundColor: "#05020E",
  },

  title: {
    fontFamily: "ProximaExtraBold",
    fontSize: 36,
    color: "#FFFFFF",
    paddingTop: 20,
    paddingHorizontal: 15,
  },

  accordion: {
    // backgroundColor: "#05020E",
    // backgroundColor: '#transparent',

  },
  accordionTitle: {
    color: '#FFFFFF',
    fontFamily: 'ProximaBold',
    fontSize: 16,
    lineHeight: 18,
    textTransform: 'uppercase',
  },
  accordionAnswer: {
    // borderWidth: 1,
    // borderColor: '#222324',
    // borderRadius: 3,
    // backgroundColor: '#222324',
    backgroundColor: '#transparent',
    paddingVertical: 10,

  },
  accordionAnswersText: {
    // fontFamily: 'Poppins',
    fontSize: 12,
    lineHeight: 15,
    paddingVertical: 9,
    paddingHorizontal: 22,
    color: '#D3D3D3',
    textAlign: 'justify',
  },
  divider: {
    marginTop: 5,
    height: 1,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: "hsla(0, 0.00%, 100.00%, 0.05)", // Semi-transparent background
  },
});
