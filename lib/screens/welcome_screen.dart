import 'package:auth/custom/button.dart';
import 'package:auth/screens/login_screen.dart';
import 'package:auth/screens/registration_screen.dart';
import 'package:flutter/material.dart';

class WelcomeScreen extends StatefulWidget {
  static const String id = "welcome";

  @override
  _WelcomeScreenState createState() => _WelcomeScreenState();
}

class _WelcomeScreenState extends State<WelcomeScreen>
    with SingleTickerProviderStateMixin {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white, //teal.withOpacity(controller.value),
      body: Padding(
        padding: EdgeInsets.symmetric(horizontal: 24.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: <Widget>[
            SizedBox(height: 20),

            Padding(
              padding: const EdgeInsets.all(20.0),
              child: Image.asset(
                'images/logo.png',
                height: 130,
              ),
            ),
            SizedBox(
              height: 40.0,
            ),
                        Container(
              width: double.infinity,
              margin: EdgeInsets.all(10),
              child: Text(
                "Sandesh",
                style: TextStyle(
                    fontFamily: "CurlyCandy", fontSize: 60, color: Colors.teal),
                textAlign: TextAlign.center,
              ),
            ),
            Text(
              "The Group Chat App",
              style: TextStyle(
                  fontFamily: "Itim-Regular", fontSize: 25, color: Colors.teal),
              textAlign: TextAlign.center,
            ),
            SizedBox(
              height: 40.0,
            ),
            CustomButton(
                label: "Log In",
                onpress: () {
                  Navigator.pushNamed(context, LoginScreen.id);
                },
                color: Colors.teal),
            CustomButton(
                label: "Register",
                onpress: () {
                  Navigator.pushNamed(context, RegistrationScreen.id);
                },
                color: Colors.teal),
          ],
        ),
      ),
    );
  }
}
