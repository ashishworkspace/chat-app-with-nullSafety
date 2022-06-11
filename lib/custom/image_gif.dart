import 'dart:math';
import 'package:flutter/material.dart';

class ImageGIf extends StatelessWidget {
  const ImageGIf({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    List<String> listImagesnotFound = [
      "images/1.gif",
      "images/2.gif",
      "images/3.gif",
      "images/4.gif",
      "images/5.gif",
      "images/6.gif",
      "images/7.gif",
      "images/8.gif",
      "images/9.gif",
      "images/10.gif",
      "images/11.gif",
      "images/13.gif",
      "images/14.gif",
      "images/15.gif",
      "images/16.gif",
      "images/17.gif",
      "images/18.gif",
      "images/19.gif",
      "images/20.gif",
      "images/21.gif",
      "images/23.gif",
      "images/25.gif",
      "images/26.gif",
      "images/27.gif",
      "images/28.gif",
      "images/29.gif",
      "images/30.gif",
      "images/31.gif",
      "images/32.gif",
    ];
    int min = 0;
    int max = listImagesnotFound.length - 1;
    var rnd = new Random();
    int r = min + rnd.nextInt(max - min);
    String imageName = listImagesnotFound[r].toString();
    return Image.asset(imageName);
  }
}
