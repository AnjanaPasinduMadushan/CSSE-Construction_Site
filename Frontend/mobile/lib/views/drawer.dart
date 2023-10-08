import 'package:flutter/material.dart';
import 'package:mobile/constants.dart';

class MyDrawer extends StatelessWidget {
  final HeaderAlignment alignment;

  const MyDrawer({
    super.key,
    required this.alignment,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.black,
      height: MediaQuery.of(context).size.height,
      child: Column(
        children: [
          Expanded(
            child: ListView(
              padding: EdgeInsets.zero,
              children: [
                DrawerHeader(
                  decoration: const BoxDecoration(
                    color: CustomColors.yellow1,
                  ),
                  child: Column(
                    crossAxisAlignment:
                        alignment == HeaderAlignment.start ? CrossAxisAlignment.start : CrossAxisAlignment.center,
                    children: const <Widget>[
                      CircleAvatar(
                        radius: 40,
                        backgroundImage: AssetImage(CustomImages.siteManagerDefault),
                      ),
                      SizedBox(height: 10),
                      Text(
                        'John Doe',
                        style: TextStyle(
                          fontWeight: FontWeight.bold,
                          fontSize: 20,
                        ),
                      ),
                      Text(
                        'Site Manager',
                        style: TextStyle(
                          fontSize: 16,
                        ),
                      ),
                    ],
                  ),
                ),
                //NavigationBar selections
                ListTile(
                  contentPadding: const EdgeInsets.symmetric(horizontal: 24),
                  leading: const Icon(
                    Icons.home,
                    color: Colors.white,
                  ),
                  title: const Text(
                    'Home',
                    style: TextStyle(color: Colors.white),
                  ),
                  onTap: () {
                    Navigator.pop(context);
                  },
                ),
                ListTile(
                  contentPadding: const EdgeInsets.symmetric(horizontal: 24),
                  leading: const Icon(
                    Icons.addchart,
                    color: Colors.white,
                  ),
                  title: const Text(
                    'Order Products',
                    style: TextStyle(color: Colors.white),
                  ),
                  onTap: () {
                    Navigator.pop(context);
                  },
                ),
                ListTile(
                  contentPadding: const EdgeInsets.symmetric(horizontal: 24),
                  leading: const Icon(
                    Icons.sticky_note_2,
                    color: Colors.white,
                  ),
                  title: const Text(
                    'View Purchase Orders',
                    style: TextStyle(color: Colors.white),
                  ),
                  onTap: () {
                    Navigator.pop(context);
                  },
                ),
                ListTile(
                  contentPadding: const EdgeInsets.symmetric(horizontal: 24),
                  leading: const Icon(
                    Icons.dynamic_feed,
                    color: Colors.white,
                  ),
                  title: const Text(
                    'Delivery Information',
                    style: TextStyle(color: Colors.white),
                  ),
                  onTap: () {
                    Navigator.pop(context);
                  },
                ),
              ],
            ),
          ),
          const Divider(
            color: CustomColors.yellow2,
            thickness: 2,
          ),
          ListTile(
            contentPadding: const EdgeInsets.symmetric(horizontal: 24),
            leading: const Icon(
              Icons.logout,
              color: Colors.white,
            ),
            title: const Text(
              'Logout',
              style: TextStyle(color: Colors.white),
            ),
            onTap: () {
              Navigator.pop(context);
            },
          ),
          const Divider(
            color: CustomColors.yellow2,
            thickness: 2,
          ),
        ],
      ),
    );
  }
}

enum HeaderAlignment {
  center,
  start,
}
