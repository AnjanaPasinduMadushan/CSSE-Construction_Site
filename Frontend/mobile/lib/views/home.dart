import 'package:flutter/material.dart';
import 'package:mobile/views/drawer.dart';

class Home extends StatelessWidget {
  const Home({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: const Drawer(
        child: MyDrawer(alignment: HeaderAlignment.start),
      ),
      appBar: AppBar(
        automaticallyImplyLeading: false,
        title: const Text('Home')
      ),
      body: const MyDrawer(alignment: HeaderAlignment.center),
    );
  }
}
