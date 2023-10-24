import 'package:flutter/material.dart';

class CustomColors {
  static const Color lightGrey = Color(0xFFD4D4D4);
  static const Color darkGrey = Color(0xFF4D4D4D);
}

class CustomImages {
  static const String logoTablet = 'assets/images/logo_tablet.png';
  static const String logo = 'assets/images/logo.png';
  static const String siteManagerDefault = 'assets/images/siteManager_no.png';
}

class Strings {
  static const String prefServerIp = 'serverIP';
}

class MyRegExps {
  static RegExp email = RegExp(r'^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$');
  static RegExp baseUrl = RegExp(r'\b(?:\d{1,3}\.){3}\d{1,3}:\d+\b');
}
