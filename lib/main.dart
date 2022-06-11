import 'package:auth/screens/chat_screen.dart';
import 'package:auth/screens/login_screen.dart';
import 'package:auth/screens/registration_screen.dart';
import 'package:auth/screens/welcome_screen.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';

void main() async {
  runApp(FlashChat());
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();
}

class FlashChat extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Center(
      child: Container(
        width: kIsWeb ? 450.0 : double.infinity,
        child: MaterialApp(
          title: "Sandesh",
          debugShowCheckedModeBanner: false,
          initialRoute: WelcomeScreen.id,
          routes: {
            WelcomeScreen.id: (context) => WelcomeScreen(),
            LoginScreen.id: (context) => LoginScreen(),
            RegistrationScreen.id: (context) => RegistrationScreen(),
            ChatScreen.id: (context) => ChatScreen()
          },
        ),
      ),
    );
  }
}
