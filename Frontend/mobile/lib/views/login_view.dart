import 'package:flutter/material.dart';
import 'package:mobile/constants.dart';
import 'package:mobile/views/sites_view.dart';
import 'package:shared_preferences/shared_preferences.dart';

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

  void _performLogin() {
    FocusScope.of(context).unfocus();

    if (_formKey.currentState != null && _formKey.currentState!.validate()) {
      // Validation passed, perform login
      final String email = _emailController.text;
      final String password = _passwordController.text;

      print('email: $email, pass: $password');

      Navigator.pushNamed(context, SitesView.routeName);
    }
  }

  String? emailValidator(String? value) {
    if (value == null || value.isEmpty) {
      return 'Please enter your email';
    }
    if (!RegExp(r'^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$').hasMatch(value)) {
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
                  onEditingComplete: _performLogin,
                ),
                Padding(
                  padding: const EdgeInsets.only(top: 40),
                  child: ElevatedButton(
                    onPressed: _performLogin,
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
