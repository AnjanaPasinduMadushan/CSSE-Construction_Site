import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:mobile/constants.dart';
import 'package:mobile/views/sites_view.dart';
import 'package:mobile/widgets/loading_popup.dart';
import 'package:mobile/widgets/message_popup.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;

class LoginView extends StatefulWidget {
  static const routeName = "/";
  const LoginView({super.key});

  @override
  State<LoginView> createState() => _LoginViewState();
}

class _LoginViewState extends State<LoginView> {
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();

  // Function to display the text input popup
  void _showIpInputField(BuildContext context) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        final TextEditingController ipController = TextEditingController();

        // Load the shared preferences value
        SharedPreferences.getInstance().then((prefs) {
          String storedIp = prefs.getString(Strings.prefServerIp) ?? '';
          ipController.text = storedIp;
        });

        return AlertDialog(
          title: const Text('Enter Backend Server IP'),
          content: TextFormField(
            controller: ipController,
            decoration: const InputDecoration(
              hintText: 'Enter IP',
            ),
          ),
          actions: <Widget>[
            ElevatedButton(
              onPressed: () {
                Navigator.of(context).pop(); // Close the dialog
              },
              child: const Text('Cancel'),
            ),
            ElevatedButton(
              onPressed: () {
                String enteredIP = ipController.text;
                SharedPreferences.getInstance().then((prefs) {
                  prefs.setString(Strings.prefServerIp, enteredIP);
                });
                Navigator.of(context).pop(); // Close the dialog
              },
              child: const Text('OK'),
            ),
          ],
        );
      },
    );
  }

  void _performLogin(BuildContext context) async {
    FocusScope.of(context).unfocus();
    LoadingPopup().display(context);

    if (_formKey.currentState != null && _formKey.currentState!.validate()) {
      final String email = _emailController.text;
      final String password = _passwordController.text;
      SharedPreferences prefs = await SharedPreferences.getInstance();
      String? baseUrl = prefs.getString(Strings.prefServerIp);

      if (baseUrl == null || !MyRegExps.baseUrl.hasMatch(baseUrl)) {
        LoadingPopup().remove();
        if (context.mounted) {
          MessagePopUp.display(
            context,
            title: 'Base Url Error',
            message: 'Either the Url has not been set, or the format is incorrect\n\nRequired format: 192.168.1.6:5050',
          );
        }
        return;
      }

      final Map<String, String> headers = {"Content-Type": "application/json"};
      final Map<String, String> data = {
        "email": email,
        "password": password,
        "role": "site-manager",
      };

      try {
        final Uri uri = Uri.http(baseUrl, '/user/login');
        final http.Response response = await http.post(uri, headers: headers, body: json.encode(data));

        if (context.mounted) _handleResponse(context, response);
      } catch (e) {
        LoadingPopup().remove();
        if (context.mounted) {
          MessagePopUp.display(
            context,
            title: 'Network Error',
            message:
                'An error occurred while communicating with the server. Please check your connection and try again.',
          );
        }
      }
    }
  }

  void _handleResponse(BuildContext context, http.Response response) {
    LoadingPopup().remove();
    if (response.statusCode == 200) {
      Navigator.pushReplacementNamed(context, SitesView.routeName);
    } else if (response.statusCode == 404) {
      MessagePopUp.display(
        context,
        title: 'User Not Found',
        message: 'Try again and contact administration',
      );
    } else if (response.statusCode == 400) {
      MessagePopUp.display(
        context,
        title: 'Invalid Password',
        message: 'Please Try again.\nContact administration to reset password',
      );
    } else {
      MessagePopUp.display(
        context,
        title: 'Login Error',
        message: 'An error occurred during login. Please try again later.',
      );
    }
  }

  String? emailValidator(String? value) {
    if (value == null || value.isEmpty) {
      return 'Please enter your email';
    }
    if (!MyRegExps.email.hasMatch(value)) {
      return 'Please enter a valid email address';
    }
    return null; // Validation passed
  }

  String? passwordValidator(String? value) {
    if (value == null || value.isEmpty) {
      return 'Please enter your password';
    }
    return null; // Validation passed
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      floatingActionButton: FloatingActionButton(
        child: const Icon(Icons.add_link),
        onPressed: () => _showIpInputField(context),
      ),
      body: SingleChildScrollView(
        child: Container(
          height: MediaQuery.of(context).size.height,
          padding: const EdgeInsets.all(40),
          child: Form(
            key: _formKey,
            child: Column(
              children: [
                SizedBox(height: MediaQuery.of(context).size.height / 40),
                const Text(
                  'BUILDMART',
                  style: TextStyle(
                    fontSize: 45,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                SizedBox(
                  height: MediaQuery.of(context).size.height / 4,
                  child: Image.asset(CustomImages.logo),
                ),
                SizedBox(height: MediaQuery.of(context).size.height / 40),
                const Align(
                  alignment: Alignment.centerLeft,
                  child: Text(
                    'Site Manager',
                    style: TextStyle(
                      fontSize: 30,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
                const Align(
                  alignment: Alignment.centerLeft,
                  child: Text(
                    'Login',
                    style: TextStyle(
                      fontSize: 25,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ),
                SizedBox(height: MediaQuery.of(context).size.height / 80),
                TextFormField(
                  controller: _emailController,
                  decoration: const InputDecoration(
                    labelText: 'Email',
                  ),
                  keyboardType: TextInputType.emailAddress,
                  textInputAction: TextInputAction.next,
                  validator: emailValidator,
                  onEditingComplete: () {
                    FocusScope.of(context).nextFocus();
                  },
                ),
                const SizedBox(height: 10),
                TextFormField(
                  controller: _passwordController,
                  decoration: const InputDecoration(
                    labelText: 'Password',
                  ),
                  obscureText: true,
                  textInputAction: TextInputAction.done,
                  validator: passwordValidator,
                  onEditingComplete: () => _performLogin(context),
                ),
                Padding(
                  padding: const EdgeInsets.only(top: 40),
                  child: ElevatedButton(
                    onPressed: () => _performLogin(context),
                    child: const Text('Login'),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
