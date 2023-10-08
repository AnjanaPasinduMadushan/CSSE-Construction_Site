import 'package:shared_preferences/shared_preferences.dart';

class MySharedPreferences {
  static SharedPreferences? _prefs;

  static Future<void> _setPrefs() async {
    _prefs ??= await SharedPreferences.getInstance();
  }

  static Future<void> setString(String key, String value) async {
    await _setPrefs();
    await _prefs!.setString(key, value);
  }

  static Future<String> getString(String key) async {
    await _setPrefs();
    return _prefs!.getString(key) ?? '';
  }
}
