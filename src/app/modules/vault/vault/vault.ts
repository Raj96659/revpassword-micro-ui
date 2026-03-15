import { Component, OnInit } from '@angular/core';
import { VaultService } from '../../../core/services/vault.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-vault',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './vault.html',
  styleUrls: ['./vault.css']
})
export class Vault implements OnInit {

  public message: string = "";
  public vaults: any[] = [];

  public site: string = '';
  public username: string = '';
  public password: string = '';
  public masterPassword: string = '';

  public searchText: string = '';
  public category: string = '';
  public favorite: boolean = false;

  showDeleteModal: boolean = false;
  deleteId: number | null = null;
  deleteWebsite: string = "";

  constructor(
  private vaultService: VaultService,
  private cd: ChangeDetectorRef
){}


  ngOnInit(){
    this.loadVault();
  }

  /* ---------------- USER ID HELPER ---------------- */

  getUserId(): number | null {
    const id = localStorage.getItem("userId");

    if(!id){
      this.message = "Session expired. Please login again.";
      this.logout();
      return null;
    }

    return Number(id);
  }

  /* ---------------- LOAD VAULT ---------------- */

  loadVault(){

    const userId = this.getUserId();
    if(userId === null) return;

    this.vaultService.getUserVault(userId).subscribe({
      next:(data:any)=>{

  this.vaults = data.map((v:any) => ({
    ...v,
    showPassword: false,
    password: ''
  }));

},

      error:(err)=>{
        console.error("Vault load failed",err);
        this.message = "Unable to load vault";
      }
    });

  }

  /* ---------------- ADD CREDENTIAL ---------------- */

  add(){

  const id = localStorage.getItem("userId");

  if(!id){
    this.message = "Please login again";
    return;
  }

  const userId = Number(id);

  const data = {
    userId: userId,
    website: this.site,
    username: this.username,
    password: this.password,
    masterPassword: this.masterPassword,
    category: this.category,
    favorite: this.favorite,
    notes: ""
  };

  this.vaultService.addCredential(data).subscribe({

    next: () => {

      // show message FIRST
      this.message = "Credential Added";

      // clear form
      this.clearForm();

      // reload vault
      this.loadVault();

      // hide message after 2 seconds
      setTimeout(()=>{
        this.message = "";
      },2000);

    },

    error: (err) => {
      console.error(err);
      this.message = "Error saving credential";
    }

  });

}

  /* ---------------- FILTER ---------------- */

  filter(){

    const userId = this.getUserId();
    if(userId === null) return;

    this.vaultService.filterVault(userId, this.category)
      .subscribe({
        next:(res:any)=>{
          this.vaults = res;
        },
        error:(err)=>{
          console.error(err);
          this.message = "Filter failed";
          this.clearMessage();
        }
      });

  }

  /* ---------------- FAVORITES ---------------- */

  favorites(){

    const userId = this.getUserId();
    if(userId === null) return;

    this.vaultService.getFavorites(userId)
      .subscribe({
        next:(res:any)=>{
          this.vaults = res;
        },
        error:(err)=>{
          console.error(err);
          this.message = "Could not load favorites";
          this.clearMessage();
        }
      });

  }

  /* ---------------- PASSWORD TOGGLE ---------------- */

togglePassword(v: any) {

  console.log("Toggle clicked", v);

  if (v.showPassword) {
    v.showPassword = false;
    this.cd.detectChanges();
    return;
  }

  const masterPassword = prompt("Enter Master Password");
  if (!masterPassword) return;

  this.vaultService.decryptPassword(v.id, masterPassword)
    .subscribe({

      next: (password: any) => {

        console.log("Decrypted password:", password);

        v.password = password;
        v.showPassword = true;

        // force UI update
        this.cd.detectChanges();
      },

      error: (err) => {
        console.error(err);
        alert("Wrong master password");
      }

    });

}


copyPassword(v: any) {

  // if password already decrypted
  if (v.showPassword && v.password) {

    navigator.clipboard.writeText(v.password);
    this.message = "Password copied!";
    this.clearMessage();
    return;

  }

  // ask master password
  const masterPassword = prompt("Enter Master Password");
  if (!masterPassword) return;

  this.vaultService.decryptPassword(v.id, masterPassword)
    .subscribe({

      next: (password: any) => {

        v.password = password;
        v.showPassword = true;

        navigator.clipboard.writeText(password);

        this.message = "Password copied!";
        this.clearMessage();

        this.cd.detectChanges();
      },

      error: () => {
        alert("Wrong master password");
      }

    });

}



/* ---------------- COPY TEXT ---------------- */

copyText(text: string) {

  if(!text){
    this.message = "Password hidden";
    this.clearMessage();
    return;
  }

  navigator.clipboard.writeText(text).then(() => {
    this.message = "Copied to clipboard!";
    this.clearMessage();
  });

}



  /* ---------------- DELETE CREDENTIAL ---------------- */

// deleteVault(id: number){

//   if(!confirm("Delete this credential?")) return;

//   this.vaultService.deleteVault(id).subscribe({

//     next:()=>{

//       // remove from UI immediately
//       this.vaults = this.vaults.filter(v => v.id !== id);

//       this.message = "Credential deleted";
//       this.clearMessage();

//     },

//     error:(err)=>{
//       console.error(err);
//       this.message = "Delete failed";
//       this.clearMessage();
//     }

//   });

// }

  openDeleteModal(v: any){
  this.showDeleteModal = true;
  this.deleteId = v.id;
  this.deleteWebsite = v.website;
}

cancelDelete(){
  this.showDeleteModal = false;
  this.deleteId = null;
}

confirmDelete(){

  if(!this.deleteId) return;

  this.vaultService.deleteVault(this.deleteId).subscribe({

    next:()=>{

      this.message = "Credential deleted";

      this.showDeleteModal = false;

      this.loadVault();

      this.clearMessage();
    },

    error:(err)=>{
      console.error(err);
      this.message = "Delete failed";
      this.clearMessage();
    }

  });

}

  /* ---------------- CLEAR FORM ---------------- */

  clearForm(){
    this.site = "";
    this.username = "";
    this.password = "";
    this.masterPassword = "";
    this.category = "";
    this.favorite = false;
  }

  /* ---------------- CLEAR MESSAGE ---------------- */

  clearMessage(){
    setTimeout(()=>{
      this.message = "";
    },2000);
  }


  search(){

  const id = localStorage.getItem("userId");

  if(!id){
    this.message = "Please login again";
    return;
  }

  const userId = Number(id);

  this.vaultService.searchVault(userId, this.searchText)
    .subscribe({

      next:(res:any)=>{
        this.vaults = res;
      },

      error:(err:any)=>{
        console.error(err);
        this.message = "Search failed";
      }

    });

}

  /* ---------------- EXPORT VAULT ---------------- */

exportVault(){

  const userId = this.getUserId();
  if(userId === null) return;

  this.vaultService.exportVault(userId).subscribe({

    next:(data:any)=>{

      const blob = new Blob([data], { type: "application/json" });

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "vault-backup.json";
      a.click();

      window.URL.revokeObjectURL(url);

      this.message = "Vault exported successfully";
      this.clearMessage();

    },

    error:(err)=>{
      console.error(err);
      this.message = "Export failed";
      this.clearMessage();
    }

  });

}


/* ---------------- IMPORT VAULT ---------------- */

importVault(event:any){

  const userId = this.getUserId();
  if(userId === null) return;

  const file = event.target.files[0];

  if(!file) return;

  this.vaultService.importVault(userId, file).subscribe({

    next:()=>{

      this.message = "Vault imported successfully";
      this.loadVault();
      this.clearMessage();

    },

    error:(err)=>{
      console.error(err);
      this.message = "Import failed";
      this.clearMessage();
    }

  });

}


  /* ---------------- LOGOUT ---------------- */

  logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    window.location.href = "/";
  }

}