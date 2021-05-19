import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';

import 'package:flutter/material.dart';

import '../constants.dart';

class ChatScreen extends StatefulWidget {
  static const String id = "chat";
  @override
  _ChatScreenState createState() => _ChatScreenState();
}

class _ChatScreenState extends State<ChatScreen> {
  @override
  void initState() {
    super.initState();
    getCurrentUser();
    getMessage();
  }

  String? messageText;
  final FirebaseAuth _auth = FirebaseAuth.instance;
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;
  User? firebaseUser;
  void getCurrentUser() async {
    try {
      final user = _auth.currentUser;
      if (user != null) {
        firebaseUser = user;
        print(firebaseUser!.email);
      }
    } catch (err) {
      print(err);
    }
  }

  void getMessage() async {
    var snaps = _firestore.collection("message").snapshots();
    await for (var snap in snaps) {
      print(snap.docs);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: null,
        actions: <Widget>[
          IconButton(
              icon: Icon(Icons.close),
              onPressed: () {
                _auth.signOut();
                Navigator.pop(context);
              }),
        ],
        title: Text('⚡️Chat'),
        backgroundColor: Colors.lightBlueAccent,
      ),
      body: SafeArea(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: <Widget>[
                              StreamBuilder<QuerySnapshot>(
                    stream: _firestore.collection("message").snapshots(),
                    builder: (context, snapshot) {
                      if (snapshot.hasData) {
                        // return ListView(children: snapshot.data!.docs.map((e) => ListTile(title: Text(e['']),)).toList(););
                        final msgDocs = snapshot.data!.docs;
                        List<Text> messageWidgets = [];
                        for (var msg in msgDocs) {
                          final msgText = msg.get("text");
                          final msgSender = msg.get("sender");
                          final messageWidget =
                              Text("$msgText from $msgSender");
                          messageWidgets.add(messageWidget);
                          print(messageWidgets);
                        }
                        return Column(children: messageWidgets);
                      }
                      throw "";
                    },
                  ),
            Container(
              decoration: kMessageContainerDecoration,
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: <Widget>[

                  Expanded(
                    child: TextField(
                      onChanged: (value) {
                        //Do something with the user input.
                        messageText = value;
                      },
                      decoration: kMessageTextFieldDecoration,
                    ),
                  ),
                  TextButton(
                    onPressed: () {
                      //Implement send functionality.
                      _firestore.collection("message").add({
                        "sender": "${_auth.currentUser!.email}",
                        "text": "$messageText"
                      });
                    },
                    child: Text(
                      'Send',
                      style: kSendButtonTextStyle,
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
