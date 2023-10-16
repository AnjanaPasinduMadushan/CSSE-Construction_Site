import 'package:flutter/material.dart';
import 'package:mobile/widgets/drawer.dart';

class SitesView extends StatefulWidget {
  static const routeName = "/sitesView";
  final GlobalKey<ScaffoldState> _scaffoldKey = GlobalKey<ScaffoldState>();

  SitesView({super.key});

  @override
  State<SitesView> createState() => _SitesViewState();
}

class _SitesViewState extends State<SitesView> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      key: widget._scaffoldKey,
      drawer: const MyDrawer(selection: Selections.sites),
      appBar: AppBar(
        title: const Text("Select Site"),
      ),
      body: Padding(
        padding: const EdgeInsets.all(12),
        child: ListView.builder(
          itemCount: 5,
          itemBuilder: (context, index) {
            return Padding(
              padding: const EdgeInsets.only(bottom: 8),
              child: ElevatedButton(
                onPressed: () {
                  widget._scaffoldKey.currentState?.openDrawer();
                },
                child: const Padding(
                  padding: EdgeInsets.symmetric(vertical: 15),
                  child: Text('Site Name'),
                ),
              ),
            );
          },
        ),
      ),
    );
  }
}
