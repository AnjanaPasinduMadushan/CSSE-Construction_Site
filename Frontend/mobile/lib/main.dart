import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'package:mobile/firebase_options.dart';
import 'package:mobile/views/home.dart';
import 'package:mobile/views/login_view.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();

  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        primarySwatch: const MaterialColor(
          0xFFE0C947,
          <int, Color>{
            50: Color(0xFFF8F2D3),
            100: Color(0xFFF4ECBE),
            200: Color(0xFFF0E5A8),
            300: Color(0xFFE9D97C),
            400: Color(0xFFE5D266),
            500: Color(0xFFE0C947), // The primary color
            600: Color(0xFFDABF25),
            700: Color(0xFFC4AC21),
            800: Color(0xFFAE991E),
            900: Color(0xFF99861A),
          },
        ),
      ),
      initialRoute: "/",
      routes: {
        "/": (context) => const LoginView(),
        "/dash": (context) => const Home(),
      },
    );
  }
}
