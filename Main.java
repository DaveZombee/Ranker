import java.util.LinkedList;
import java.util.Scanner;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;

public class Main {

	public static void main(String[] args) {
		LinkedList<Item> listOfItems = new LinkedList<Item>(); // add all the items to this list
		boolean isDone = false; // flag if all of the items in the list have the same rank

		// Reading file of the list of items
		try {
			File myObj = new File("list.txt");
			Scanner fileReader = new Scanner(myObj);

			while (fileReader.hasNextLine()) {
				String name = fileReader.nextLine();
				listOfItems.add(new Item(name)); // creating items using names
			}
			fileReader.close();
		} catch (FileNotFoundException e) {
			System.out.println("file was not found!!");
		}

		int listLength = listOfItems.size();

		// Assigning each object's rank and creating battle arrays
		for (int i = 0; i < listLength; i++) {
			listOfItems.get(i).setRank(listLength);
			listOfItems.get(i).createBattle(listLength);
		}

		while (isDone == false) { // while some items still have the same rank

			int noChange = 0; // zero = no change, one = at least one rank has been changed

			// Checking items if they have the same rank
			for (int i = 0; i < listLength; i++) { // one before the last one cus itll already be checked

				for (int j = 0; j < listLength; j++) {

					if (i != (i + j) && (i + j) < listLength) { // not the same element and index isn't bigger

						Item itemOne = listOfItems.get(i); // first item
						Item itemTwo = listOfItems.get(i + j); // second item

						if (itemOne.getRank() == itemTwo.getRank()) { // if they have the same rank

							noChange = 1; // there will be a change

							// Checking if the items have previously battled before
							if (itemOne.getBattles()[i + j] != 0 && itemTwo.getBattles()[i] != 0) {
								if (itemOne.getBattles()[i + j] == 2) { // item one wins, item two loses
									itemOne.setRank(itemOne.getRank() - 1);
								}

								else if (itemOne.getBattles()[i + j] == 1) { // item one loses, item two wins
									itemTwo.setRank(itemTwo.getRank() - 1);
								}
							}

							// items haven't battled yet
							else {

								// Ask user which one they like better
								Scanner input = new Scanner(System.in);
								System.out.printf("Which one do you like more? 1. " + itemOne.getName() + " 2. "
										+ itemTwo.getName() + " ");
								int userFav = input.nextInt();

								// Changing the rank accordingly and the battle array
								if (userFav == 1) { // user picks first one
									itemOne.setRank(itemOne.getRank() - 1);

									itemOne.setBattleWin(i + j);
									itemTwo.setBattleLose(i);
								}

								else if (userFav == 2) { // user picks second one
									itemTwo.setRank(itemTwo.getRank() - 1);

									itemTwo.setBattleWin(i);
									itemOne.setBattleLose(i + j);
								}
							}
						}
					}
				}
			}

			// Check if noSwaps equals to zero, which ends this loop
			if (noChange == 0)
				isDone = true;
		}

		// sorting items in list according to rank
		for (int i = 0; i < listLength; i++) {
			for (int j = 0; j < listLength - i; j++) {
				if (j + 1 < listLength) {
					int itemOneRank = listOfItems.get(j).getRank();
					int itemTwoRank = listOfItems.get(j + 1).getRank();

					if (itemOneRank > itemTwoRank) {
						Item tempItem = listOfItems.get(j);
						listOfItems.set(j, listOfItems.get(j + 1));
						listOfItems.set(j + 1, tempItem);
					}
				}
			}
		}

		// printing out the name and their rank (also write to file)
		try {
			FileWriter writer = new FileWriter("result.txt");
			writer.write("RESULTS OF SORTER");
			
			for (int i = 0; i < listLength; i++) {
				Item item = listOfItems.get(i);
				String rankStr = item.getRank() + ": " + item.getName();

				System.out.println(rankStr);
				writer.write("\n"+rankStr);
			}
			writer.close();
		} catch (IOException e) {
			System.out.println("uh oh error");
		}

	}
}
