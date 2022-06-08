import 'package:flutter/material.dart';

class CustomButton extends StatelessWidget {
  final String label;
  final dynamic onpress;
  final Color color;
  CustomButton(
      {required this.label, required this.onpress, required this.color});
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.symmetric(vertical: 20.0, horizontal: 20),
      child: Material(
        elevation: 5.0,
        color: color,
        borderRadius: BorderRadius.circular(30.0),
        child: ElevatedButton(
          style: ElevatedButton.styleFrom(
            primary: Colors.teal,
            fixedSize: const Size(100, 45),
            elevation: 20,
          ),
          onPressed: onpress,
          child: Text(
            label,
            style: TextStyle(color: Colors.white, fontSize: 17),
          ),
        ),
      ),
    );
  }
}
