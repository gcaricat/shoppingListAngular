import {
  Component, OnDestroy,
  OnInit, ViewChild,

} from '@angular/core';


import { Ingredient } from '../../shared/ingredient.model';
import {ShoppingListService} from "../_shopping-list.service";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";

import * as ShoppingListActions from '../store/shopping-list-actions';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // @ViewChild('nameInput', { static: false }) nameInputRef: ElementRef;
  // @ViewChild('amountInput', { static: false }) amountInputRef: ElementRef;
  // @Output() ingredientAdded = new EventEmitter<Ingredient>();

  @ViewChild('f', {static: false}) slForm: NgForm;

  subscription: Subscription;
  editMode = false;
  editedItem: Ingredient;


  constructor(
    // private slService: ShoppingListService,
    // private store: Store<{ shoppingList: {ingredient: Ingredient[] } }>
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {
   this.subscription =  this.store
     .select('shoppingList')
     .subscribe(stateDate => {
      if(stateDate.editedIngredientIndex > -1){
        this.editMode = true;
        this.editedItem = stateDate.editedIngredient;
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        });
      } else {
        this.editMode = false;
      }
    });

    //with rxjs
    // this.subscription = this.slService.startedEditing
    //   .subscribe(
    //     (index: number) => {
    //       this.editedItemIndex = index;
    //       this.editMode = true;
    //       this.editedItem = this.slService.getIngredient(index);
    //       cliccando sugli elementi viene modificato il form
    //       this.slForm.setValue({
    //         name: this.editedItem.name,
    //         amount: this.editedItem.amount,
    //       });
    //     }
    //   );
  }

  onSubmit(form: NgForm) {
    // const ingName = this.nameInputRef.nativeElement.value;
    // const ingAmount = this.amountInputRef.nativeElement.value;
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    // this.ingredientAdded.emit(newIngredient);

    if( this.editMode ){
     // this.slService.updateIngredient(this.editedItemIndex, newIngredient)
      this.store.dispatch(
        new ShoppingListActions.UpdateIngredient(newIngredient)
      );
    }else {
      // this.slService.addIngredient(newIngredient);
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    }

    this.editMode = false;
    form.reset();

  }

  onClear(){
    this.slForm.reset();
    this.editMode = false;
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  onDelete(){
    // this.slService.deleteIngredient(this.editedItemIndex);
    this.store.dispatch(new ShoppingListActions.DeleteIngredient())
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }


}
