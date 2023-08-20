import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import colors from "../utils/colors";
import { heightRes, widthRes } from "../utils/responsive";
import Ionicons from "react-native-vector-icons/Ionicons";
import textStyle from "../utils/textStyle";
import Button from "../components/Button";
import { useNavigation } from "@react-navigation/native";
import { rejectPosting } from "../redux/slice/user/userSlice";
import ViewShot, { captureRef } from "react-native-view-shot";
import * as Sharing from "expo-sharing";

const MyJob = () => {
  const navigation = useNavigation();
  const { school, rejected } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const reject = () => {
    dispatch(rejectPosting());
    navigation.replace("Home");
  };

  const ref = useRef();

  const printPDF = async () => {
    try {
      const uri = await captureRef(ref, {
        format: "png",
        quality: 0.7,
        fileName: "Byte-app ",
      });
      await Sharing.shareAsync(`file://${uri}`, {});
    } catch (error) {}
  };

  return (
    <View style={styles.container}>
      <Ionicons
        name="chevron-back-outline"
        size={widthRes(6)}
        onPress={() => navigation.goBack()}
      />
      <View style={styles.content}>
        <ViewShot
          ref={ref}
          style={{
            backgroundColor: colors.white,
            padding: heightRes(2),
            paddingVertical: heightRes(3),
          }}
        >
          <Ionicons
            name="bonfire"
            size={widthRes(10)}
            color={colors.primary}
            style={{ marginVertical: heightRes(3) }}
          />
          <View style={{ flex: 1, alignSelf: "center" }}>
            <View style={styles.item}>
              <Text
                style={[
                  textStyle.defaultRegularSubheadline,
                  { color: "#808080" },
                ]}
              >
                Name
              </Text>
              <Text style={styles.itemText}>
                {school?.firstName} {school?.lastName}
              </Text>
            </View>
            <View style={styles.item}>
              <Text
                style={[
                  textStyle.defaultRegularSubheadline,
                  { color: "#808080" },
                ]}
              >
                Phone Number
              </Text>
              <Text style={styles.itemText}>{school?.phoneNumber}</Text>
            </View>
            <View style={styles.item}>
              <Text
                style={[
                  textStyle.defaultRegularSubheadline,
                  { color: "#808080" },
                ]}
              >
                Email
              </Text>
              <Text style={styles.itemText}>{school?.email}</Text>
            </View>
            <View style={styles.item}>
              <Text
                style={[
                  textStyle.defaultRegularSubheadline,
                  { color: "#808080" },
                ]}
              >
                School Address
              </Text>
              <Text style={styles.itemText}>{school?.Address}</Text>
            </View>
            <View style={styles.item}>
              <Text
                style={[
                  textStyle.defaultRegularSubheadline,
                  { color: "#808080" },
                ]}
              >
                School Town
              </Text>
              <Text style={styles.itemText}>{school?.Town}</Text>
            </View>
            <View style={styles.item}>
              <Text
                style={[
                  textStyle.defaultRegularSubheadline,
                  { color: "#808080" },
                ]}
              >
                School Name
              </Text>
              <Text style={styles.itemText}>{school?.Schoolname}</Text>
            </View>
            <TouchableOpacity style={styles.print} onPress={printPDF}>
              <Ionicons name="print" size={widthRes(7)} />
            </TouchableOpacity>
          </View>
        </ViewShot>
        {rejected === 3 ? (
          <View style={styles.error}>
            <Text
              style={[
                textStyle.defaultRegularFootnote,
                { color: "#CF4F66", textAlign: "center" },
              ]}
            >
              You have exceeded the amount of times you can reject
            </Text>
          </View>
        ) : (
          <Button
            title="Reject Job"
            click={reject}
            containerStyle={{
              marginTop: 30,
            }}
          />
        )}
      </View>
    </View>
  );
};

export default MyJob;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: heightRes(2),
  },
  content: {
    height: heightRes(80),
    marginVertical: heightRes(1),
    borderRadius: 15,
    alignItems: "center",
    elevation: 2,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: colors.black,
    shadowOpacity: 0.4,
    shadowRadius: 3,
    backgroundColor: colors.white,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: heightRes(1),
  },
  itemText: [
    textStyle.defaultBoldSubheadline,
    {
      width: "62%",
      textAlign: "right",
    },
  ],
  error: {
    backgroundColor: "#FFE5EB",
    width: "100%",
    padding: heightRes(1),
    borderRadius: 10,
    marginVertical: heightRes(3),
  },
  print: {
    alignSelf: "flex-end",
    marginVertical: heightRes(4),
  },
});
