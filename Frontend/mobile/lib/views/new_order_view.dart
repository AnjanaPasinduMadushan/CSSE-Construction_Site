import 'package:drop_down_search_field/drop_down_search_field.dart';
import 'package:flutter/material.dart';
import 'package:mobile/constants.dart';
import 'package:mobile/widgets/drawer.dart';

class NewOrderView extends StatefulWidget {
  static const routeName = "/newOrder";
  const NewOrderView({super.key});

  @override
  State<NewOrderView> createState() => _NewOrderViewState();
}

class _NewOrderViewState extends State<NewOrderView> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: const MyDrawer(selection: Selections.newOrder),
      appBar: AppBar(
        title: const Text("New Order"),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {},
        child: const Icon(Icons.add_task),
      ),
      body: Column(
        children: [
          Expanded(
            child: Container(
              width: double.infinity,
              color: CustomColors.lightGrey,
              child: Padding(
                padding: const EdgeInsets.all(22),
                child: Container(
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(10.0),
                    color: Colors.white,
                  ),
                  padding: const EdgeInsets.all(20),
                  child: SingleChildScrollView(
                    child: Form(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Text(
                            'Add Product',
                            style: TextStyle(
                              fontSize: 30,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          const SizedBox(height: 25),
                          const Text(
                            'Supplier',
                            style: TextStyle(
                              fontSize: 17,
                              fontWeight: FontWeight.w300,
                            ),
                          ),
                          DropDownSearchFormField(
                            itemBuilder: (context, itemData) {
                              return const Text('Selection Option');
                            },
                            suggestionsCallback: (pattern) async {
                              final List<String> suggestions = [
                                'Option 1',
                                'Option 2',
                                'Option 3',
                                'Option 4',
                                'Option 5',
                              ];

                              return suggestions.where((suggestion) => suggestion.contains(pattern)).toList();
                            },
                            onSuggestionSelected: (suggestion) {},
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
