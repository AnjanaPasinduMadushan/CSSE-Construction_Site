import 'package:flutter/material.dart';
import 'package:mobile/constants.dart';
import 'package:mobile/views/login_view.dart';
import 'package:mobile/views/new_order_view.dart';
import 'package:mobile/views/sites_view.dart';

class MyDrawer extends StatelessWidget {
  final Selections? selection;
  const MyDrawer({
    super.key,
    this.selection,
  });

  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: Container(
        color: Colors.black,
        height: MediaQuery.of(context).size.height,
        child: Column(
          children: [
            Expanded(
              child: ListView(
                padding: EdgeInsets.zero,
                children: [
                  //Header
                  const DrawerHeader(
                    decoration: BoxDecoration(
                      color: CustomColors.lightGrey,
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: <Widget>[
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
                          'Site: Uduwalewa High',
                          style: TextStyle(
                            fontSize: 16,
                          ),
                        ),
                      ],
                    ),
                  ),
                  //NavigationBar selections

                  //Sites
                  ListTile(
                    contentPadding: const EdgeInsets.symmetric(horizontal: 24),
                    leading: const Icon(
                      Icons.build_circle_outlined,
                      color: Colors.white,
                    ),
                    title: const Text(
                      'Sites',
                      style: TextStyle(color: Colors.white),
                    ),
                    onTap: () {
                      if (selection == Selections.sites) {
                        Navigator.pop(context);
                        return;
                      }
                      Navigator.pushNamedAndRemoveUntil(
                        context,
                        SitesView.routeName,
                        (route) => false,
                      );
                    },
                  ),
                  //New Order
                  ListTile(
                    contentPadding: const EdgeInsets.symmetric(horizontal: 24),
                    leading: const Icon(
                      Icons.addchart,
                      color: Colors.white,
                    ),
                    title: const Text(
                      'New Order',
                      style: TextStyle(color: Colors.white),
                    ),
                    onTap: () {
                      print('asdf');
                      if (selection == Selections.newOrder) {
                        Navigator.pop(context);
                        return;
                      }
                      Navigator.pushNamedAndRemoveUntil(
                        context,
                        NewOrderView.routeName,
                        (route) => false,
                      );
                    },
                  ),
                  //Pending Orders
                  ListTile(
                    contentPadding: const EdgeInsets.symmetric(horizontal: 24),
                    leading: const Icon(
                      Icons.sticky_note_2,
                      color: Colors.white,
                    ),
                    title: const Text(
                      'Pending Orders',
                      style: TextStyle(color: Colors.white),
                    ),
                    onTap: () {
                      if (selection == Selections.pendingOrders) {
                        Navigator.pop(context);
                        return;
                      }
                    },
                  ),
                  //Active Orders
                  ListTile(
                    contentPadding: const EdgeInsets.symmetric(horizontal: 24),
                    leading: const Icon(
                      Icons.dynamic_feed,
                      color: Colors.white,
                    ),
                    title: const Text(
                      'Active Orders',
                      style: TextStyle(color: Colors.white),
                    ),
                    onTap: () {
                      if (selection == Selections.activeOrders) {
                        Navigator.pop(context);
                        return;
                      }
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
              onTap: () async {
                Navigator.pushNamedAndRemoveUntil(
                  context,
                  LoginView.routeName,
                  (route) => false,
                );
              },
            ),
            const Divider(
              color: CustomColors.yellow2,
              thickness: 2,
            ),
          ],
        ),
      ),
    );
  }
}

enum Selections {
  sites,
  newOrder,
  pendingOrders,
  activeOrders,
}
