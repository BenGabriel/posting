import { Image, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import colors from "../utils/colors";
import Input from "../components/Input";
import { heightRes, widthRes } from "../utils/responsive";
import Button from "../components/Button";
import textStyle from "../utils/textStyle";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/slice/user/userSlice";

const Login = () => {
  const navigation = useNavigation();
  const { user, loggedIn } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const [details, setDetails] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (loggedIn) {
      navigation.navigate("Home");
    }
  }, []);
  const onChange = useCallback(
    (name, value) => {
      setError((prev) => ({ ...prev, [name]: "" }));
      setDetails((prev) => ({ ...prev, [name]: value }));
    },
    [details]
  );

  const errorHandler = useCallback(
    (name, value) => {
      setError((prev) => ({ ...prev, [name]: value }));
    },
    [details]
  );

  const handleSubmit = () => {
    if (details?.email !== user?.email) {
      return errorHandler("email", "Invalid Email");
    }
    if (details?.password !== user?.password) {
      return errorHandler("password", "Invalid Password");
    }

    dispatch(loginUser());
    navigation.replace("Home");
  };

  return (
    <View style={styles.container}>
      {loggedIn ? null : (
        <>
          <Image
            source={require("../applogo.png")}
            style={{
              width: widthRes(40),
              height: widthRes(20),
              resizeMode: "contain",
            }}
          />
          <View style={{ width: "100%" }}>
            <Text style={styles.text}>Email</Text>
            <Input
              error={error.email}
              onChange={(text) => onChange("email", text)}
            />
            <Text style={styles.text}>Password</Text>
            <Input
              error={error.password}
              onChange={(text) => onChange("password", text)}
              secure
            />
            <Text
              style={{
                textAlign: "right",
                ...textStyle.defaultRegularFootnote,
                marginTop: heightRes(1),
              }}
              onPress={() => navigation.navigate("Register")}
            >
              Don't have an account?{" "}
              <Text style={{ color: colors.primary }}>Sign Up</Text>
            </Text>
          </View>
          <Button
            title="Login"
            containerStyle={{
              marginTop: heightRes(5),
            }}
            click={handleSubmit}
          />
        </>
      )}
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
    padding: heightRes(3),
  },
  text: {
    ...textStyle.defaultBoldSubheadline,
    marginTop: heightRes(2),
    marginBottom: heightRes(0.7),
  },
});
